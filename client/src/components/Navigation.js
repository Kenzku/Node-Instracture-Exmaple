/**
 * Created by Huang, Fuguo (aka ken) on 16/08/2017.
 */
import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

const Tab = ({ match }) => (
  <div>
    <h3>You selected {match.params.tabId}</h3>
  </div>
);

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {match} = this.props;
    return (
      <div>
        <h2>Tabs</h2>
        <ul>
          <li>
            <Link to={`${match.url}/tab1`}>
              Tab 1
            </Link>
          </li>
          <li>
            <Link to={`${match.url}/tab2`}>
              Tab 2
            </Link>
          </li>
          <li>
            <Link to={`${match.url}/tab3`}>
              Tab 3
            </Link>
          </li>
        </ul>

        <Route path={`${match.url}/:tabId`} component={Tab}/>
        <Route exact={false} path={match.url} render={() => (
          <h3>Please select a tab</h3>
        )}/>
      </div>
    );
  };
}

export default Navigation;