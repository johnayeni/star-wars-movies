/* eslint-disable camelcase */
import React from 'react';
import AppContext from 'context';

const OpeningCrawl = () => (
  <AppContext.Consumer>
    {({ selectedMovieId, movieList }) => {
      const { opening_crawl } = movieList[selectedMovieId];
      return (
        <div className="opening-crawl-marquee">
          <p>{opening_crawl}</p>
        </div>
      );
    }}
  </AppContext.Consumer>
);

export default OpeningCrawl;
