import React, { useContext } from 'react';
import AppContext from 'context';
import { isArrayAndHasContent, sortCharacters } from 'utils';
import GenderFilter from 'components/GenderFilter';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import TableFooter from './components/TableFooter';

const CharacterList = () => {
  const {
    movies,
    characters,
    sortOrder,
    sortBy,
    toggleKeyOrder,
    selectedMovieIndex,
    filter,
    onfilterChange,
  } = useContext(AppContext);

  const { key, type } = sortBy;
  const movieId = movies[selectedMovieIndex].episode_id;
  const movieCharacters = characters[movieId] || [];
  const filteredCharacters = movieCharacters
    .filter(character => filter === 'all' || character.gender === filter);
  const filteredAndSortedCharacters = sortCharacters({
    characters: filteredCharacters, key, type, order: sortOrder[key],
  });
  return (
    <div id="characters">
      <p className="title">Characters</p>
      <GenderFilter characters={movieCharacters} filter={filter} onfilterChange={onfilterChange} />
      {isArrayAndHasContent(movieCharacters) ? (
        <React.Fragment>
          <table className="character-list-table">
            <TableHeader toggleKeyOrder={toggleKeyOrder} sortOrder={sortOrder} />
            <TableBody characters={filteredAndSortedCharacters} />
            <TableFooter
              characters={filteredAndSortedCharacters}
            />
          </table>
        </React.Fragment>
      ) : (
        <p className="text--white">No characters available</p>
      )}
    </div>
  );
};

export default CharacterList;
