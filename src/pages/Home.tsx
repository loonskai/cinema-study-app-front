import * as React from 'react';
import Layout from './../components/Layout';
import PageTitle from './../components/PageTitle';
import SearchField from './../components/SearchField';

const { useState } = React;

const Home = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log(movie);
    console.log(city);
    console.log(cinema);
  };

  const [movie, setMovie] = useState('');
  const [city, setCity] = useState('');
  const [cinema, setCinema] = useState('');

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <PageTitle text="Let's find something interesting" />
        <SearchField
          id="movie"
          type="text"
          entity="movie"
          label="Movie Title"
          value={movie}
          handleChange={setMovie}
        />
        <SearchField
          id="city"
          type="text"
          entity="city"
          label="Where do you live?"
          value={city}
          handleChange={setCity}
        />
        <SearchField
          id="cinema"
          type="select"
          entity="cinema"
          label="Choose Cinema"
          value={cinema}
          handleChange={setCinema}
        />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default Home;
