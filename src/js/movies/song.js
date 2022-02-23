import Media from "./media";

class Song extends Media {
  constructor(title, duration, artist) {
    super(title, duration);
    this.artist = artist;
  }
  toHtml() {
    return super.toHtml(this.artist);
  }
}

export default Song;
