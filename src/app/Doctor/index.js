import React, { Component } from 'react';
import Sound from 'react-sound';

import Nav from '../common/Nav';
import Maslo from '../common/maslo/index';

import Dialogue from './Dialogue';

class Doctor extends Component {
  state = {
    dialogueStep: null
  };

  //onClick of Play button
  startDialogue = e => {
    this.setState({
      dialogueStep: 0
    });
    e.target.play();
  };

  dialogueNext = e => {
    let nextStep = this.state.dialogueStep + 1;

    this.setState({
      dialogueStep: nextStep
    });

    e.target.play();

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

    // current video
    let currentVid =
      dialogueStep === null || dialogueStep > Dialogue.length - 1
        ? ''
        : Dialogue[dialogueStep].video;

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
      <>
        <Nav />
        <Sound
          url={currentAudio}
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={this.dialogueNext}
        />
        <div className="maslo-container">
          <Maslo
            dialogueStep={this.state.dialogueStep}
            dialoguePage="DialogueD"
          />
          <p>{currentMasloText}</p>
        </div>

        <div className="patient-container">
          <video
            onClick={this.startDialogue}
            width="300"
            onEnded={e => this.dialogueNext(e)}
          >
            <source src={currentVid || Dialogue[0].video} type="video/mp4" />
          </video>
          <p>{currentPatientText}</p>
        </div>
      </>
    );
  }
}

export default Doctor;
