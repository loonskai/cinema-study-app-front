import * as React from 'react';
import Layout from './../components/Layout';
import PageTitle from './../components/PageTitle';
import SearchField from './../components/SearchField';

const { useState } = React;

const Home = () => {
  const handleChange = e => {
    switch (e.target.id) {
      case 'movie': {
        setMovie(e.target.value);
      }
      case 'city': {
        setCity(e.target.value);
      }
      case 'cinema': {
        setCinema(e.target.value);
      }
      default:
        return null;
    }
  };

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
        />
        <SearchField
          id="city"
          type="text"
          entity="city"
          label="Where do you live?"
          value={city}
        />
        <SearchField
          id="cinema"
          type="select"
          entity="cinema"
          label="Choose Cinema"
          value={cinema}
        />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default Home;
