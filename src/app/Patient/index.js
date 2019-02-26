import React, { Component } from 'react';

import Nav from '../common/Nav';
import Maslo from '../common/Maslo';

class Patient extends Component {
  state = {
    dialogueOption: null
  };

  changeDialogueOption = e => {
    const option = e.currentTarget.value;

    this.setState({
      dialogueOption: option
    });
  };

  render() {
    const { dialogueOption } = this.state;
    const patientDialogue = [
      'Patient says this...',
      'Patient says that...',
      'alright...'
    ];

    return (
      <section className="main-container">
        <Nav />

        <div className="maslo-container">
          <Maslo />
          <p>Maslo's response here</p>
        </div>

        <div className="patient-container">
          <p>{patientDialogue[dialogueOption]}</p>
          <ul>
            <li>
              <button onClick={this.changeDialogueOption} value="0">
                1
              </button>
            </li>
            <li>
              <button onClick={this.changeDialogueOption} value="1">
                2
              </button>
            </li>
            <li>
              <button onClick={this.changeDialogueOption} value="2">
                3
              </button>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default Patient;
