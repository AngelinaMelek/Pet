import Media from "./media";

class Movie extends Media {
  constructor(title, duration, year) {
    super(title, duration);
    this.year = year;
  }
  toHtml() {
    return super.toHtml(this.year);
  }
}

export default Movie;
