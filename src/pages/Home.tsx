import * as React from 'react';
import Layout from './../components/Layout';
import styled from 'styled-components';

import PageTitle from './../components/PageTitle';
import TextField from './../components/TextField';

const Home = () => {
  return (
    <Layout>
      <React.Fragment>
        <PageTitle text="Let's find something interesting" />
        <TextField label="Movie Title" icon="movie" />
        <TextField label="Where do you live?" icon="city" />
      </React.Fragment>
    </Layout>
  );
};

export default Home;
