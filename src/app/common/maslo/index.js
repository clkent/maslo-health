import React, { Component } from 'react';

import '../common.scss';

import MasloIDLE1 from '../../resources/masloIDLE1.gif';
import DialogueP from '../../Patient/Dialogue';
import DialogueD from '../../Doctor/Dialogue';

class Maslo extends Component {
  render() {
    let { dialogueStep, dialoguePage } = this.props;

    //use appropriate Dialogue based on which page you're on
    let Dialogue = dialoguePage === 'DialogueP' ? DialogueP : DialogueD;
    const dialogueLength = Dialogue.length - 1;

    // if there's no dialogue step set Maslo to idle otherwise use maslo's appropriate animation
    let currentMaslo =
      dialogueStep === null || dialogueStep > dialogueLength
        ? MasloIDLE1
        : Dialogue[dialogueStep].animation;

    return (
      <div id="maslo">
        <img src={currentMaslo} width="600" alt="maslo animation" />
      </div>
    );
  }
}

export default Maslo;
