import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Movie from '../../../classes/Movie';
import AddButton from '../../buttons/AddButton';
import {
  containerGreyColor,
  whiteColor,
  mainDarkColor,
  greyColor
} from '../../../constants';

interface Props {
  handleSelectItem: (id: string) => void;
  movies: Movie[];
  moviesSelected: { [key: number]: Movie };
}

const ListContainer = styled.div`
  width: 100%;
  max-height: 400px;
  margin-bottom: 2rem;
  padding: 2rem;
  overflow: scroll;
  background: ${containerGreyColor};
  border: 1px solid ${greyColor};
  border-radius: 5px;
  box-shadow: inset 0px 0px 30px -10px rgba(0, 0, 0, 0.2);
`;

const ListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: ${whiteColor};
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  transition: all 600ms cubic-bezier(0.165, 0.84, 0.44, 1);

  && div {
    text-align: center;
  }

  &&.movie-selected {
    background: ${mainDarkColor};
    color: ${whiteColor};
    box-shadow: none;
  }

  @media screen and (max-width: 556px) {
    flex-wrap: wrap;
  }
`;

const ListItemTitle = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
`;

const ListItemPoster = styled.img`
  width: 100px;
  margin-right: 1rem;
`;

const ListItemOverview = styled.div`
  font-size: 0.8rem;
  line-height: 1.2rem;
`;

const SelectButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
`;

const ExternalAPIMoviesList = ({
  handleSelectItem,
  movies,
  moviesSelected
}: Props) => {
  return (
    <ListContainer>
      {!movies
        ? 'No movies'
        : movies.map(movie => {
            const isSelected = !!moviesSelected[movie.id];
            const movieClass = classnames({
              'movie-selected': isSelected
            });
            return (
              <ListItem key={movie.id.toString()} className={movieClass}>
                <div>
                  <ListItemPoster src={movie.poster} />
                </div>
                <div>
                  <ListItemTitle>{movie.title}</ListItemTitle>
                  <ListItemOverview>{movie.overview}</ListItemOverview>
                </div>
                <SelectButtonContainer>
                  <AddButton
                    icon={isSelected ? <DeleteIcon /> : <AddIcon />}
                    handleClick={handleSelectItem}
                    id={movie.id}
                    isSelected={isSelected}
                  />
                </SelectButtonContainer>
              </ListItem>
            );
          })}
    </ListContainer>
  );
};

export default ExternalAPIMoviesList;
