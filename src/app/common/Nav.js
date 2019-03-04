import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './common.scss';

export default class Nav extends Component {
  render() {
    return (
      <ul className="nav">
        <li>
          <NavLink to="/patient" activeClassName="selected">
            Patient's View
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctor" activeClassName="selected">
            Doctor's View
          </NavLink>
        </li>
      </ul>
    );
  }
}
