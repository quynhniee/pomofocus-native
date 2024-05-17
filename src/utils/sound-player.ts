import { Audio } from 'expo-av';

let soundObject = new Audio.Sound();

async function loadSound(soundFile: string) {
  try {
    await soundObject.unloadAsync(); // Unload any sound that might be loaded
    await soundObject.setIsLoopingAsync(true);
    await soundObject.loadAsync({ uri: soundFile });
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
      const { sound } = await Audio.Sound.createAsync(
        { uri: source },
        { shouldPlay: true }
      );
      soundObject = sound;

      await soundObject.setVolumeAsync(volume);
      await soundObject.playAsync();
  
      // Stop the sound after 5 seconds
      setTimeout(async () => {
        await soundObject.unloadAsync();
        console.log('Sound stopped');
      }, 5000);
    } catch (error) {
      console.log('Error playing preview', error);
    }
  }

export { loadSound, playSound, pauseSound, unloadSound, playPreview };