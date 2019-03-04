import React, { Component } from 'react';
import Sound from 'react-sound';

import './doctor.scss';

import Nav from '../common/Nav';
import Maslo from '../common/maslo/index';

import DialogueD from './Dialogue';
import { Signs, Symptoms, SignalProcessing } from './Data';

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
      dialogueStep: 0,
      buttonClass: 'stopBtn'
    });
    this.dialogueNext();
  };

  //method to update dialogueStep after each video ends and start the next step
  dialogueNext = () => {
    const { dialogueStep, signs, symptoms } = this.state;
    const dialogueLength = DialogueD.length - 1;

    // as long as the current step is less than the length of the dialogue array
    // increment the step up and play the new video
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
      symptoms.push(Symptoms[dialogueStep]);
    } else {
      //reset state when all videos end
      setTimeout(this.stopDialogue, 3000);
    }
  };

  stopDialogue = () => {
    this.setState({
      dialogueStep: 0,
      buttonClass: null,
      signs: [],
      symptoms: []
    });
  };

  render() {
    let { dialogueStep, signs, symptoms, buttonClass } = this.state;
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
      dialogueStep && dialogueStep <= dialogueLength ? (
        <Sound
          url={DialogueD[dialogueStep].audio}
          playStatus={Sound.status.PLAYING}
        />
      ) : null;

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

    //current data to display
    let currentSigns = signs.map(s => (s ? <li>{s}</li> : null));
    let currentSymptoms = symptoms.map(s => (s ? <li>{s}</li> : null));

    //current signal to display
    let currentSignal = SignalProcessing[dialogueStep - 1];

    let currentSignalTitle =
      dialogueStep && dialogueStep <= dialogueLength
        ? Object.keys(currentSignal)[0]
        : null;

    let currentSignalText =
      dialogueStep && dialogueStep <= dialogueLength
        ? currentSignal[currentSignalTitle]
        : null;

    //determine start / stop button
    let buttonState = buttonClass ? this.stopDialogue : this.startDialogue;

    return (
      <section className="doctor-page">
        <Nav />

        <div className="intro">
          <p>
            In real time, Maslo interprets signal processing input &amp; maps it
            to outputs in the audio &amp; visual interface so that the patient
            feels acknowledged. Maslo then creates a list of observations based
            on its interaction with the patient. Below is a representation of
            the inner workings of Maslo.
            <button className={buttonClass} onClick={buttonState} />
          </p>
        </div>

        <section className="container">
          <div className="patient-container">
            <video
              id="video"
              key={currentVid}
              width="640"
              onEnded={this.dialogueNext}
              src={currentVid}
              poster={currentVidPoster}
            />
            <p>{currentPatientText}</p>
            <div className={`signals-${dialogueStep}`}>
              <h3>{currentSignalTitle}</h3>
              <p>{currentSignalText}</p>
            </div>
          </div>

          <div className="maslo-container maslo-doctor">
            {currentAudio}
            <Maslo dialogueStep={dialogueStep} dialoguePage="DialogueD" />
            <div className="right-col">
              <p>{currentMasloText}</p>
              <div className="maslo-report">
                <h3>Signs:</h3>
                <ul className="signs">{currentSigns}</ul>
                <h3>Symptoms:</h3>
                <ul className="symptoms">{currentSymptoms}</ul>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default Doctor;
