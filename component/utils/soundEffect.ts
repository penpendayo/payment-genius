import { addUrlPrefix } from "../utils/addUrlPrefix";

const createAudio = (path: string, currentTime = 0, volume = 1) => {
  if (typeof window !== "undefined") {
    const audio = new Audio(path);
    audio.currentTime = currentTime;
    audio.volume = volume;
    return audio;
  }
};

export const audio = {
  openRegister: createAudio(
    addUrlPrefix("/se/open-register.mp3")
  ) as HTMLAudioElement,
};
