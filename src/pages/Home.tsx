import * as React from 'react';
import Layout from './../components/Layout';
import styled from 'styled-components';

import PageTitle from './../components/PageTitle';
import SearchField from './../components/SearchField';

const Home = () => {
  return (
    <Layout>
      <React.Fragment>
        <PageTitle text="Let's find something interesting" />
        <SearchField type="text" label="Movie Title" icon="movie" />
        <SearchField type="text" label="Where do you live?" icon="city" />
        <SearchField type="select" label="Choose Cinema" icon="cinema" />
      </React.Fragment>
    </Layout>
  );
};

export default Home;
