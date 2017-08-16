/**
 * Created by Huang, Fuguo (aka ken) on 16/08/2017.
 */
import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import {HomePage, Navigation} from './RouteIndex';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tabs">Navigation</Link></li>
        </ul>

        <hr/>
        <Route path="/" component={HomePage}/>
        <Route path="/tabs" component={Navigation}/>
      </div>
    );
  }
}