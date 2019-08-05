/* eslint-disable camelcase */
import React from 'react';
import AppContext from 'context';

const OpeningCrawl = () => (
  <AppContext.Consumer>
    {({ selectedMovieIndex, movieList }) => {
      const { opening_crawl } = movieList[selectedMovieIndex];
      return (
        <div className="opening-crawl-marquee">
          <p>{opening_crawl}</p>
        </div>
      );
    }}
  </AppContext.Consumer>
);

export default OpeningCrawl;
