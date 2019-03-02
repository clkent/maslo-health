//Video
import Patient0 from '../resources/Patient1.mp4';
import Patient1 from '../resources/Patient2.mp4';
import Patient2 from '../resources/Patient3.mp4';
import Patient3 from '../resources/Patient4.mp4';
import Patient4 from '../resources/Patient5.mp4';
import Patient5 from '../resources/Patient6.mp4';
import Patient6 from '../resources/Patient7.mp4';
import Patient7 from '../resources/Patient1.mp4';

//Audio
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
import MasloIDLE3 from '../resources/masloIDLE3.gif';
import MasloEND from '../resources/masloEND.gif';

const DialogueD = [
  {
    video: Patient0,
    audio: Maslo1,
    animation: MasloINIT
  },
  {
    video: Patient1,
    patient: 'Hey Maslo, Im uhh... not feeling well',
    animation: MasloIDLE1
  },
  {
    video: Patient2,
    audio: Maslo2,
    maslo: 'Sorry to hear. What is going on?',
    animation: MasloNO
  },
  {
    video: Patient3,
    patient:
      'Well Im just not myself and my family said I should talk to somebody',
    animation: MasloIDLE2
  },
  {
    video: Patient4,
    audio: Maslo3,
    maslo: 'Has this been going on for some time?',
    animation: MasloQ
  },
  {
    video: Patient5,
    patient: 'Yea, Its been a few months',
    animation: MasloIDLE3
  },
  {
    video: Patient6,
    audio: Maslo4,
    maslo: 'I hear you - let me transfer you to the doctor.',
    animation: MasloEND
  },
  {
    video: Patient7,
    patient: 'Thanks',
    animation: MasloIDLE3
  }
];

export default DialogueD;
