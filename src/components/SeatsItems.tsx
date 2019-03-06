import React, { useEffect, useState } from 'react';

import api from './../ApiService';

const SeatsItems = ({ options, hall }: any) => {
  const [seats, setSeats]: [any, any] = useState(null);

  const loadSeats = async () => {
    try {
      const seatsLoaded: any = await api.loadHallSeats(hall, options);
      setSeats(seatsLoaded.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSeats();
  }, [hall]);

  const renderSeats = () => {
    if (!seats || seats.length === 0) return 'No seats found';
    console.log(seats);
  };

  if (!hall) return <div>Please, choose a hall</div>;

  return <div>{renderSeats()}</div>;
};

export default SeatsItems;
