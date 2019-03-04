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
      buttonClass: 'stopBtn'
    });
  };

  //if stop button is hit end cycle otherwise add a slight pause
  // between dialogue steps
  dialogueNext = () => {
    if (this.state.dialogueStep === null) {
      return;
    }
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

  stopDialogue = () => {
    this.setState({
      dialogueStep: null,
      buttonClass: null
    });
  };

  render() {
    let { dialogueStep, buttonClass } = this.state;
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

    //determine start / stop button
    let buttonState = buttonClass ? this.stopDialogue : this.startDialogue;

    return (
      <section className="patient-page">
        <Nav />
        <div className="intro">
          <p>
            Maslo is a powerful aid in triaging patients. Below is a simple
            demonstration of how a patient could interact with Maslo.
          </p>
          <button className={buttonClass} onClick={buttonState} />
        </div>
        <Sound
          url={currentAudio}
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={this.dialogueNext}
        />
        <div className="maslo-container">
          <Maslo dialogueStep={dialogueStep} dialoguePage="DialogueP" />
          <p>{currentMasloText}</p>
        </div>

        <div className="patient-container">
          <p>{currentPatientText}</p>
        </div>
      </section>
    );
  }
}

export default Patient;
