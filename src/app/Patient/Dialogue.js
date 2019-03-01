//Audio
import Patient1 from '../resources/Patient1.mp3';
import Patient2 from '../resources/Patient2.mp3';
import Patient3 from '../resources/Patient3.mp3';
import Patient4 from '../resources/Patient4.mp3';

import Maslo1 from '../resources/maslo1.mp3';
import Maslo2 from '../resources/maslo2.mp3';
import Maslo3 from '../resources/maslo3.mp3';
import Maslo4 from '../resources/maslo4.mp3';

//Animations
import MasloIDLE from '../resources/masloIDLE.gif';

const DialogueP = [
  {
    audio: Maslo1,
    animation: MasloIDLE
  },
  {
    audio: Patient1,
    patient: 'Hey Maslo, Im uhh... not feeling well',
    animation: MasloIDLE
  },
  {
    audio: Maslo2,
    maslo: 'Sorry to hear. What is going on?',
    animation: MasloIDLE
  },
  {
    audio: Patient2,
    patient:
      'Well Im just not myself and my family said I should talk to somebody',
    animation: MasloIDLE
  },
  {
    audio: Maslo3,
    maslo: 'Has this been going on for some time?',
    animation: MasloIDLE
  },
  {
    audio: Patient3,
    patient: 'Yea, Its been a few months',
    animation: MasloIDLE
  },
  {
    audio: Maslo4,
    maslo: 'I hear you - let me transfer you to the doctor.',
    animation: MasloIDLE
  },
  {
    audio: Patient4,
    patient: 'Thanks',
    animation: MasloIDLE
  }
];

export default DialogueP;
