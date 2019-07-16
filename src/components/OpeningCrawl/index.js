/* eslint-disable camelcase */
import React from 'react';
import AppContext from 'context';

const OpeningCrawl = () => (
  <AppContext.Consumer>
    {({ selectedMovie, movieList }) => {
      const { opening_crawl } = movieList[selectedMovie];
      return (
        <div className="opening-crawl-marquee">
          <p>{opening_crawl}</p>
        </div>
      );
    }}
  </AppContext.Consumer>
);

export default OpeningCrawl;
