import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../classes/Order';
import orderService from '../services/Order';
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';
import HistorySection from '../components/history/HistorySection';

interface UserDataType {
  isAuth: boolean;
  isAdmin: boolean;
  userID: number | null;
  userName: string | null;
}

const UserProfile: React.FC<{ userName: string }> = ({ userName }) => {
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
      <PageTitle text={`Welcome, ${userName}`} />
      <HistorySection orders={orders} />
    </Fragment>
  );
};

export default connect(({ auth }: { auth: UserDataType }) => ({
  userName: auth.userName || 'Anonymous'
}))(UserProfile);
