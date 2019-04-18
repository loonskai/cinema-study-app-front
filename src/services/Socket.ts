import io from 'socket.io-client';

import apiService from './Api';
import { SeatItem } from '../interfaces/Api';

class Socket {
  public socket: any;

  connect(handler: any) {
    this.socket = io.connect(
      process.env.API_ROOT_PATH || 'http://localhost:5000'
    );
    this.socket.on('connect', () => {
      this.socket
        .emit('authenticate', { token: apiService.accessToken })
        .on('authenticated', () => {
          console.log('authorized via socket!');
          this.socket.on('refreshSeats', handler);
        })
        .on('unauthorized', () => {
          console.log('unable to authorize via socket');
        });
    });
  }

  async toggleReservation(sessionID: number, item: SeatItem) {
    this.socket.emit('toggleReservation', {
      sessionID,
      item
    });
    return true;
  }

  async disconnect() {
    this.socket.disconnect();
  }

  async clearReservation(sessionID: number, items: SeatItem[]) {
    this.socket.emit('clearReservation', {
      sessionID,
      items
    });
    return true;
  }
}

export default new Socket();
