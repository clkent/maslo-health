import React, { Component } from 'react';
import Sound from 'react-sound';

import Nav from '../common/Nav';
import Maslo from '../common/maslo/index';

import DialogueP from './Dialogue';

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

  //slight pause between dialogue steps
  dialogueNext = () => {
    setTimeout(this.changeDialogue, 1000);
  };

  //change dialogue
  changeDialogue = () => {
    let { dialogueStep } = this.state;
    let dialogueLength = DialogueP.length - 1;

    this.setState({
      dialogueStep: dialogueStep + 1
    });

    //once dialogue ends show play button again
    if (dialogueStep >= dialogueLength) {
      this.setState({
        buttonClass: null
      });
    }
  };

  render() {
    let { dialogueStep } = this.state;
    const dialogueLength = DialogueP.length - 1;

    // current audio
    let currentAudio =
      dialogueStep !== null && dialogueStep <= dialogueLength
        ? DialogueP[dialogueStep].audio
        : null;

    // current patient text to display
    let currentPatientText =
      dialogueStep !== null && dialogueStep <= dialogueLength
        ? DialogueP[dialogueStep].patient
        : null;

    // current maslo text to display
    let currentMasloText =
      dialogueStep !== null && dialogueStep <= dialogueLength
        ? DialogueP[dialogueStep].maslo
        : null;

    return (
      <section className="main-container">
        <Nav />
        <Sound
          url={currentAudio}
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={this.dialogueNext}
        />
        <div className="maslo-container">
          <Maslo
            dialogueStep={this.state.dialogueStep}
            dialoguePage="DialogueP"
          />
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
