import React, { Component } from 'react';
import Sound from 'react-sound';

import Nav from '../common/Nav';
import Maslo from '../common/maslo/index';

import Dialogue from './Dialogue';

class Patient extends Component {
  state = {
    dialogueStep: null,
    buttonClass: null
  };

  //onClick of Play button
  startDialogue = () => {
    this.setState({
      dialogueStep: 0,
      buttonClass: 'hideBtn'
    });
  };

  //at end of audio pause and then change dialogue
  dialogueNext = () => {
    setTimeout(this.changeDialogue, 1500);
  };

  //change dialogue
  changeDialogue = () => {
    let nextStep = this.state.dialogueStep + 1;

    this.setState({
      dialogueStep: nextStep
    });

    //once dialogue ends show play button again
    let { dialogueStep } = this.state;
    if (dialogueStep > Dialogue.length - 1) {
      this.setState({
        buttonClass: null
      });
    }
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
          <button
            className={this.state.buttonClass}
            onClick={this.startDialogue}
          >
            Play
          </button>
        </div>
      </section>
    );
  }
}

export default Patient;
