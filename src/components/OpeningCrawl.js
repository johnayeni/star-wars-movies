/* eslint-disable camelcase */
import React, { useContext } from 'react';
import AppContext from 'context';

const OpeningCrawl = () => {
  const { selectedMovieIndex, movies } = useContext(AppContext);
  const { opening_crawl } = movies[selectedMovieIndex];
  return (
    <div className="opening-crawl-marquee">
      <p>{opening_crawl}</p>
    </div>
  );
};

export default OpeningCrawl;
