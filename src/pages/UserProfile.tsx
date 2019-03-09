import React, { Fragment, useState, useEffect } from 'react';

import api from '../ApiService';
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';
import HistorySection from '../components/history/HistorySection';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const userLoadedData: any = await api.loadUserInfo();
      setUserData(userLoadedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <Fragment>
      <PageTitle
        text={`Welcome, ${userData ? userData.username : 'Anonymous'}`}
      />
      <HistorySection />
    </Fragment>
  );
};

export default UserProfile;
