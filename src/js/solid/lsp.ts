class VideoPlayer {
  public play(file: string): void {
    console.log("playing");
  }
}

class AviVideoPlayer extends VideoPlayer {
  public play(file: string): void {
    if (file.indexOf('avi') === -1) {
      throw Error("I play only avi format")
    }
  }
}