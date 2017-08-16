/**
 * Created by Huang, Fuguo (aka ken) on 16/08/2017.
 */
require('normalize.css/normalize.css');
import React from 'react';
import { Link } from 'react-router-dom';

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>Go to <Link to="/">Home Page</Link></p>
      </div>
    );
  }
}
module.exports = PageNotFound;
