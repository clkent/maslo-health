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
import MasloINIT from '../resources/masloINIT.gif';
import MasloIDLE1 from '../resources/masloIDLE1.gif';
import MasloNO from '../resources/masloNO.gif';
import MasloIDLE2 from '../resources/masloIDLE2.gif';
import MasloQ from '../resources/masloQ.gif';
import MasloEND from '../resources/masloEND.gif';

const DialogueP = [
  {
    audio: Maslo1,
    animation: MasloINIT
  },
  {
    audio: Patient1,
    patient: 'Hey Maslo, Im uhh... not feeling well',
    animation: MasloIDLE1
  },
  {
    audio: Maslo2,
    maslo: 'Sorry to hear. What is going on?',
    animation: MasloNO
  },
  {
    audio: Patient2,
    patient:
      'Well Im just not myself and my family said I should talk to somebody',
    animation: MasloIDLE2
  },
  {
    audio: Maslo3,
    maslo: 'Has this been going on for some time?',
    animation: MasloQ
  },
  {
    audio: Patient3,
    patient: 'Yea, Its been a few months',
    animation: MasloIDLE2
  },
  {
    audio: Maslo4,
    maslo: 'I hear you - let me transfer you to the doctor.',
    animation: MasloEND
  },
  {
    audio: Patient4,
    patient: 'Thanks',
    animation: MasloIDLE1
  }
];

export default DialogueP;
