import Media from './media'


function Movie(title, duration, year){
    Media.call(this, title, duration)
    this.year = year;
}
Movie.prototype = Object.create(Media.prototype)
Movie.prototype.constructor = Movie

Movie.prototype.getInfo = function(){
    return `Year : ${this.year}`
}

export default Movie;
