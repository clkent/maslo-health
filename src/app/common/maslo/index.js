import React, { Component } from 'react';

import MasloIDLE from '../../resources/masloIDLE.gif';
import DialogueP from '../../Patient/Dialogue';
import DialogueD from '../../Doctor/Dialogue';

class Maslo extends Component {
  render() {
    let { dialogueStep, dialoguePage } = this.props;

    //use appropriate Dialogue based on which page you're on
    let Dialogue = dialoguePage === 'DialogueP' ? DialogueP : DialogueD;

    // if there's no dialogue step set Maslo to idle otherwise use maslo's appropriate animation
    let maslo = !dialogueStep ? MasloIDLE : Dialogue[dialogueStep].animation;

    return (
      <div id="maslo">
        <img src={maslo} width="600" alt="maslo animation" />
      </div>
    );
  }
}

export default Maslo;
