import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <ul className="nav">
        <li>
          <NavLink to="/patient" activeClassName="selected">
            Patient
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctor" activeClassName="selected">
            Doctor
          </NavLink>
        </li>
      </ul>
    );
  }
}
