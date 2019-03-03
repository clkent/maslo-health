import React, { Component } from 'react';
import Sound from 'react-sound';

import Nav from '../common/Nav';
import Maslo from '../common/maslo/index';

import DialogueD from './Dialogue';
import { Signs, Symptoms, SignalProcessingOutput } from './Data';

class Doctor extends Component {
  state = {
    dialogueStep: 0,
    buttonClass: null,
    signs: [],
    symptoms: []
  };

  //onClick of button
  startDialogue = () => {
    this.setState({
      buttonClass: 'hideBtn'
    });
    this.dialogueNext();
  };

  //method to update dialogueStep after each video ends and start the next step
  dialogueNext = () => {
    const { dialogueStep, signs } = this.state;
    const dialogueLength = DialogueD.length - 1;

    if (dialogueStep < dialogueLength) {
      this.setState(
        {
          dialogueStep: dialogueStep + 1
        },
        () => {
          let video = document.getElementById('video');
          video.load();
          video.play();
        }
      );
      signs.push(Signs[dialogueStep]);
    } else {
      //reset state when all videos end
      this.setState({
        dialogueStep: 0,
        buttonClass: null
      });
    }
  };

  render() {
    let { dialogueStep, signs, buttonClass } = this.state;
    const dialogueLength = DialogueD.length - 1;

    // current video
    let currentVid =
      dialogueStep && dialogueStep <= dialogueLength
        ? DialogueD[dialogueStep].video
        : DialogueD[0].video;

    // current video poster
    let currentVidPoster =
      dialogueStep && dialogueStep <= dialogueLength
        ? DialogueD[dialogueStep].poster
        : DialogueD[0].poster;

    // current audio
    let currentAudio =
      dialogueStep && dialogueStep <= dialogueLength
        ? DialogueD[dialogueStep].audio
        : null;

    // current patient text to display
    let currentPatientText =
      dialogueStep && dialogueStep <= dialogueLength
        ? DialogueD[dialogueStep].patient
        : null;

    // current maslo text to display
    let currentMasloText =
      dialogueStep && dialogueStep <= dialogueLength
        ? DialogueD[dialogueStep].maslo
        : null;

    //current data displayed

    let currentSigns = [...signs];

    // let currentSymptoms =
    //   dialogueStep && dialogueStep <= dialogueLength
    //     ? SignalProcessingOutput[0].Symptoms
    //     : null;

    // let currentProcessingTitle =
    //   dialogueStep && dialogueStep <= dialogueLength
    //     ? Object.keys(SignalProcessing[dialogueStep])
    //     : null;

    // let currentProcessing =
    //   dialogueStep && dialogueStep <= dialogueLength
    //     ? SignalProcessing[dialogueStep][0]
    //     : null;

    return (
      <>
        <Nav />
        <div className="maslo-container">
          <Sound url={currentAudio} playStatus={Sound.status.PLAYING} />
          <Maslo dialogueStep={dialogueStep} dialoguePage="DialogueD" />
          <div className="maslo-report">
            <p>{currentMasloText}</p>
            <div className="maslo-diagnostic">
              <p className={dialogueStep}>
                Signs:
                {currentSigns}
              </p>
            </div>
          </div>
        </div>

        <div className="patient-container">
          <video
            id="video"
            key={currentVid}
            width="600"
            onEnded={this.dialogueNext}
            src={currentVid}
            poster={currentVidPoster}
          />
          <p>{currentPatientText}</p>

          <button className={buttonClass} onClick={this.startDialogue}>
            Play
          </button>
        </div>
      </>
    );
  }
}

export default Doctor;
