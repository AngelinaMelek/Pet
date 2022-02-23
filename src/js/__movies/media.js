function Media(title, duration){
    this.title = title;
    this.duration = duration;
   this.isPlaying = false
}
Media.prototype.play = function(){
    this.isPlaying = true
}
Media.prototype.stop = function(){
    this.isPlaying = false
}

Media.prototype.getInfo = function(){
    throw Error('Method getInfo must be overriden in subclasses')
}

Media.prototype.toHtml = function(){
return `<div class="row py-3 ${this.isPlaying ? "current": ''}">
    <div class="col-sm-9">${this.title} - ${this.getInfo()}</div>
    <div class="col-sm-3">${this.duration}</div>
    </div>`
}


export default Media;