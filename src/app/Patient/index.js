import React, { Component } from 'react';
import Sound from 'react-sound';

import Nav from '../common/Nav';
import Maslo from '../common/maslo/index';

import Dialogue from './Dialogue';

class Patient extends Component {
  state = {
    dialogueStep: null,
    button: 'Play Patient'
  };

  startDialogue = () => {
    this.setState({
      dialogueStep: 0,
      button: ''
    });
  };

  dialogueNext = () => {
    setTimeout(this.changeDialogue, 1500);
  };

  changeDialogue = () => {
    let nextStep = this.state.dialogueStep + 1;
    this.setState({
      dialogueStep: nextStep
    });
  };

  render() {
    let { dialogueStep } = this.state;

    // current audio
    let currentAudio =
      dialogueStep === null || dialogueStep > Dialogue.length - 1
        ? ''
        : Dialogue[dialogueStep].audio;

    // current patient text to display
    let currentPatientText =
      dialogueStep === null || dialogueStep > Dialogue.length - 1
        ? ''
        : Dialogue[dialogueStep].patient;

    // current maslo text to display
    let currentMasloText =
      dialogueStep === null || dialogueStep > Dialogue.length - 1
        ? ''
        : Dialogue[dialogueStep].maslo;

    return (
      <section className="main-container">
        <Nav />
        <Sound
          url={currentAudio}
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={this.dialogueNext}
        />
        <div className="maslo-container">
          <Maslo dialogueStep={this.state.dialogueStep} />
          <p>{currentMasloText}</p>
        </div>

        <div className="patient-container">
          <p>{currentPatientText}</p>
          <button onClick={this.startDialogue}>{this.state.button}</button>
        </div>
      </section>
    );
  }
}

export default Patient;
