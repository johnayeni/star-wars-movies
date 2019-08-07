/* eslint-disable camelcase */
import React from 'react';
import AppContext from 'context';

const OpeningCrawl = () => (
  <AppContext.Consumer>
    {({ selectedMovieIndex, movies }) => {
      const { opening_crawl } = movies[selectedMovieIndex];
      return (
        <div className="opening-crawl-marquee">
          <p>{opening_crawl}</p>
        </div>
      );
    }}
  </AppContext.Consumer>
);

export default OpeningCrawl;
