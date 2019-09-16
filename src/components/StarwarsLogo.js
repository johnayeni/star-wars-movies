import React from 'react';
import logo from 'assets/img/starwars-logo.png';

function StarwarsLogo() {
  return (
    <React.Fragment>
      <img src={logo} alt="star wars logo" width="300" />
      <p>May the force be with you!</p>
    </React.Fragment>
  );
}

export default StarwarsLogo;
