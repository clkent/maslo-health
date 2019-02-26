import Patient1 from '../resources/Patient1.m4a';
import Patient2 from '../resources/Patient2.m4a';
import Patient3 from '../resources/Patient3.m4a';
import Patient4 from '../resources/Patient4.m4a';

import Maslo1 from '../resources/maslo1.mp3';
import Maslo2 from '../resources/maslo2.mp3';
import Maslo3 from '../resources/maslo3.mp3';
import Maslo4 from '../resources/maslo4.mp3';

const Dialogue = [
  {
    audio: Maslo1
  },
  {
    audio: Patient1,
    patient: 'Hey Maslo, Im uhh... not feeling well'
  },
  {
    audio: Maslo2,
    maslo: 'Sorry to hear. What is going on?'
  },
  {
    audio: Patient2,
    patient:
      'Well Im just not myself and my family said I should talk to somebody'
  },
  {
    audio: Maslo3,
    maslo: 'Has this been going on for some time?'
  },
  {
    audio: Patient3,
    patient: 'Yea, Its been a few months'
  },
  {
    audio: Maslo4,
    maslo: 'I hear you - let me transfer you to the doctor.'
  },
  {
    audio: Patient4,
    patient: 'Thanks'
  }
];

export default Dialogue;
