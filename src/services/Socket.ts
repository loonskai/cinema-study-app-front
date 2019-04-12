import io from 'socket.io-client';

import apiService from './Api';

const socket = io('http://localhost:5000');

export default {
  async connect() {
    socket.on('connect', () => {
      socket
        .emit('authenticate', { token: apiService.accessToken })
        .on('authenticated', () => {
          console.log('connected via socket!');
        })
        .on('unauthorized', () => {
          console.log('unable to connect via socket:(');
        });
    });
    socket.emit('connect');
  }
};
