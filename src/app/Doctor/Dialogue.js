//Video
import Patient1 from '../resources/Patient1.mp4';
import Patient2 from '../resources/Patient2.mp4';
import Patient3 from '../resources/Patient3.mp4';
import Patient4 from '../resources/Patient4.mp4';

//Video Posters
import Poster1 from '../resources/Poster1.png';
import Poster2 from '../resources/Poster2.png';
import Poster3 from '../resources/Poster3.png';
import Poster4 from '../resources/Poster4.png';

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
    poster: Poster1
  },
  {
    audio: Maslo2,
    maslo: 'Sorry to hear. What is going on?',
    animation: MasloNO,
    video: Patient2,
    poster: Poster2
  },
  {
    audio: Maslo3,
    maslo: 'Has this been going on for some time?',
    animation: MasloQ,
    video: Patient3,
    poster: Poster3
  },
  {
    audio: Maslo4,
    maslo: 'I hear you - let me transfer you to the doctor.',
    animation: MasloEND,
    video: Patient4,
    poster: Poster4
  }
];

export default DialogueD;
