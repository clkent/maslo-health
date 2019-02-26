import React, { Component } from 'react';

class Maslo extends Component {
  render() {
    let maslo = !this.props.dialogueStep ? 'heyo' : this.props.dialogueStep;

    return <div className="maslo">{maslo}</div>;
  }
}

export default Maslo;
