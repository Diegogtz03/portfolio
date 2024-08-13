import { Howl } from 'howler';
import { SoundData } from '@/interfaces/intro';

let animationStarted: boolean = false;
let startUpData: SoundData;
let keyboardData: SoundData;

export async function exectuteTransition() {
  animationStarted = true;
  // Start playing computer startup noise
  startUpData = await playStartUp();

  setTimeout(async () => {
    // Start playing keyboard typing noise
    keyboardData = await playKeyboard();
  }, 3000);
}

async function playStartUp() {
  const audioURL = 'media/sounds/computer_startup.mp3';

  var sound = new Howl({
    src: [audioURL],
    loop: true,
    volume: 0.7
  });
  
  var id1 = sound.play();

  return {
    sound: sound,
    id1: id1
  }
}

async function playKeyboard() {
  const audioURL = 'media/sounds//keyboard_typing.mp3';

  var sound = new Howl({
    src: [audioURL],
    loop: true,
    volume: 0.9
  });
  
  var id1 = sound.play();

  return {
    sound: sound,
    id1: id1
  }
}


async function playFadeOutSound() {
  const audioURL = 'media/sounds/fadeout_sound.mp3';

  var sound = new Howl({
    src: [audioURL],
    volume: 1.1
  });
  
  sound.play();
}

export async function endTransition() {
  setTimeout(() => {
    playFadeOutSound();
    // stop the sound effects
    startUpData.sound.fade(0.7, 0, 1000, startUpData.id1);
    keyboardData.sound.fade(0.9, 0, 1000, keyboardData.id1);
  }, 500);

  // START GSAP TRANSITION (Music, records flying out?)
}


// Skip animation functionality

export async function skipAnimation() {
  if (!animationStarted) {
    setTimeout(() => {
      playFadeOutSound();
    }, 500);
    // TRANSISTION OUT
  } else {
    endTransition();
  }
}