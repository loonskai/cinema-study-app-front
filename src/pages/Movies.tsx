import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import actions from './../redux/actions/index';

const Movies = ({ loadMoviesList }: { loadMoviesList: any }) => {
  useEffect(() => {
    loadMoviesList();
  });

  return <div>Movies</div>;
};

export default connect(
  null,
  actions
)(Movies);
