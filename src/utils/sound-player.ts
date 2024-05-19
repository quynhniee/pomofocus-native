import { Audio } from 'expo-av';

let soundObject = new Audio.Sound();

async function loadSound(soundFile: string, volume: number = 1) {
  try {
    if (!soundFile) return;

    await soundObject.unloadAsync(); // Unload any sound that might be loaded
    await soundObject.loadAsync({ uri: soundFile}, { volume: volume, isLooping: true});
    // await soundObject.setVolumeAsync(volume);
    // await soundObject.setIsLoopingAsync(true);
    console.log('Sound loaded');
  } catch (error) {
    console.log('Error loading sound', error);
  }
}

async function playSound() {
  try {
    await soundObject.playAsync();
    console.log('Sound playing');
  } catch (error) {
    console.log('Error playing sound', error);
  }
}

async function pauseSound() {
  try {
    await soundObject.pauseAsync();
    console.log('Sound paused');
  } catch (error) {
    console.log('Error pausing sound', error);
  }
}

async function unloadSound() {
  try {
    await soundObject.unloadAsync();
    console.log('Sound unloaded');
  } catch (error) {
    console.log('Error unloading sound', error);
  }
}

async function playPreview(source: string, volume: number = 1) {
    try {
      if (window['timeoutID']) {
        clearTimeout(window['timeoutID']);
      }
      await loadSound(source, volume);
      await playSound();
      const timeoutID = setTimeout(async () => {
        await pauseSound();
      }, 5000);
      window['timeoutID'] = timeoutID;
    } catch (error) {
      console.log('Error playing preview', error);
    }
  }

async function playNewSound(soundFile: string, volume: number = 1, timeout?: number) {
  try {
    const newSoundObject = new Audio.Sound();
    await newSoundObject.loadAsync({ uri: soundFile }, { volume: volume, isLooping: timeout && true, shouldPlay: true });

    if (timeout) {
      setTimeout(async () => {
        await newSoundObject.unloadAsync();
      }, timeout);
    }

  } catch (error) {
    console.log('Error playing new sound', error);
  }
}

export { loadSound, playSound, pauseSound, unloadSound, playPreview, playNewSound };