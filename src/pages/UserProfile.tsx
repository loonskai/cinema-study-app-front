import React, { Fragment, useState, useEffect } from 'react';

import Order from '../classes/Order';
import orderService from '../services/Order';
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';
import HistorySection from '../components/history/HistorySection';

const UserProfile: React.FC = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    orderService.getPersonalOrders(setOrders);
    setLoading(false);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Fragment>
      <PageTitle
        text={`Welcome, ${
          orders && !!orders.length ? orders[0].user.username : 'Anonymous'
        }`}
      />
      <HistorySection orders={orders} />
    </Fragment>
  );
};

export default UserProfile;
