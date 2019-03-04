//Video
import Patient1 from '../resources/Patient1.mp4';
import Patient3 from '../resources/Patient3.mp4';
import Patient5 from '../resources/Patient5.mp4';
import Patient7 from '../resources/Patient7.mp4';

//Video Posters
import Poster1 from '../resources/Poster1.jpg';

//Audio
import Maslo1 from '../resources/maslo1.mp3';
import Maslo2 from '../resources/maslo2.mp3';
import Maslo3 from '../resources/maslo3.mp3';
import Maslo4 from '../resources/maslo4.mp3';

//Animations
import MasloINIT from '../resources/masloINIT.gif';
import MasloIDLE1 from '../resources/masloIDLE1.gif';
import MasloNO from '../resources/masloNO.gif';
import MasloQ from '../resources/masloQ.gif';
import MasloEND from '../resources/masloEND.gif';

const DialogueD = [
  {
    animation: MasloIDLE1,
    poster: Poster1
  },
  {
    audio: Maslo1,
    animation: MasloINIT,
    video: Patient1,
    poster: Poster1,
    patient: 'Hey Maslo, Im uhh... not feeling well'
  },
  {
    audio: Maslo2,
    maslo: 'Sorry to hear. What is going on?',
    animation: MasloNO,
    video: Patient3,
    poster: Poster1,
    patient:
      'Well Im just not myself and my family said I should talk to somebody'
  },
  {
    audio: Maslo3,
    maslo: 'Has this been going on for some time?',
    animation: MasloQ,
    video: Patient5,
    poster: Poster1,
    patient: 'Yea, Its been a few months'
  },
  {
    audio: Maslo4,
    maslo: 'I hear you - let me transfer you to the doctor.',
    animation: MasloEND,
    video: Patient7,
    poster: Poster1,
    patient: 'Thanks'
  }
];

export default DialogueD;
