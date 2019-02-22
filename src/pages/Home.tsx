import * as React from 'react';
import Layout from './../components/Layout';
import PageTitle from './../components/PageTitle';
import SearchField from './../components/SearchField';

const Home = () => {
  return (
    <Layout>
      <React.Fragment>
        <PageTitle text="Let's find something interesting" />
        <SearchField
          type="text"
          entity="movie"
          label="Movie Title"
          icon="movie"
        />
        <SearchField
          type="text"
          entity="city"
          label="Where do you live?"
          icon="city"
        />
        <SearchField
          type="select"
          entity="cinema"
          label="Choose Cinema"
          icon="cinema"
        />
      </React.Fragment>
    </Layout>
  );
};

export default Home;
