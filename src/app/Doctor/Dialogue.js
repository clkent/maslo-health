//Video
import Patient0 from '../resources/Patient1.m4v';
import Patient1 from '../resources/Patient2.m4v';
import Patient2 from '../resources/Patient3.m4v';
import Patient3 from '../resources/Patient4.m4v';
import Patient4 from '../resources/Patient5.m4v';
import Patient5 from '../resources/Patient6.m4v';
import Patient6 from '../resources/Patient7.m4v';
import Patient7 from '../resources/Patient1.m4v';

//Audio
import Maslo1 from '../resources/maslo1.mp3';
import Maslo2 from '../resources/maslo2.mp3';
import Maslo3 from '../resources/maslo3.mp3';
import Maslo4 from '../resources/maslo4.mp3';

//Animations
import MasloIDLE from '../resources/masloIDLE.gif';
import Patient from '../Patient/index';

const DialogueD = [
  {
    video: Patient0,
    audio: Maslo1,
    animation: MasloIDLE
  },
  {
    video: Patient1,
    patient: 'Hey Maslo, Im uhh... not feeling well',
    animation: MasloIDLE
  },
  {
    video: Patient2,
    audio: Maslo2,
    maslo: 'Sorry to hear. What is going on?',
    animation: MasloIDLE
  },
  {
    video: Patient3,
    patient:
      'Well Im just not myself and my family said I should talk to somebody',
    animation: MasloIDLE
  },
  {
    video: Patient4,
    audio: Maslo3,
    maslo: 'Has this been going on for some time?',
    animation: MasloIDLE
  },
  {
    video: Patient5,
    patient: 'Yea, Its been a few months',
    animation: MasloIDLE
  },
  {
    video: Patient6,
    audio: Maslo4,
    maslo: 'I hear you - let me transfer you to the doctor.',
    animation: MasloIDLE
  },
  {
    video: Patient7,
    patient: 'Thanks',
    animation: MasloIDLE
  }
];

export default DialogueD;
