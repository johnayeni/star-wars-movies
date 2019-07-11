/* eslint-disable camelcase */
import React from 'react';
import AppContext from 'context';

const OpeningCrawl = () => (
  <AppContext.Consumer>
    {({ selectedMovie: { opening_crawl } }) => (
      <div className="opening-crawl-marquee">
        <p>{opening_crawl}</p>
      </div>
    )}
  </AppContext.Consumer>
);

export default OpeningCrawl;
