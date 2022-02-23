import Media from './media'


function Song(title, duration, artist){
    Media.call(this, title, duration)
    this.artist = artist;
}
Song.prototype = Object.create(Media.prototype)
Song.prototype.constructor = Song

Song.prototype.getInfo = function(){
    return `Artist : ${this.artist}`
}

export default Song;