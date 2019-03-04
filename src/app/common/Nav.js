import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './common.scss';

import logo from '../resources/logo.svg';

export default class Nav extends Component {
  render() {
    return (
      <>
        <div className="welcome">
          <img src={logo} alt="maslo logo" />
          <p>Healthcare Demo</p>
        </div>
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
      </>
    );
  }
}
