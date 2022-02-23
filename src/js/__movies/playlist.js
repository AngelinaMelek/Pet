function PlayList(){
   this.items = []
   this.currentIndex = 0;
}

PlayList.prototype.add = function(item){
    this.items.push(item)
}

PlayList.prototype.play = function(){
    const item = this.items[this.currentIndex]
    item.play();
}

PlayList.prototype.stop = function(){
     const item = this.items[this.currentIndex]
    item.stop();
}

PlayList.prototype.next = function(){
    this.stop();
    this.currentIndex++;
    if(this.currentIndex === this.items.length){
        this.currentIndex = 0;
    }
    this.play();
}
PlayList.prototype.render = function(el){
el.innerHTML = this.items.map( item => item.toHtml()).join('') 
}


export default PlayList;