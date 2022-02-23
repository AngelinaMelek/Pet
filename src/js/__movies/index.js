import Song from './song'
import Movie from './movie'
import PlayList from './playlist'

const el = document.getElementById('list')
const playList = new PlayList();
const s1 = new Song('The feeling', "03.35", "Justin Beber")
const s2 = new Song('yellow submarine', "04.35", "The Beatles")
const s3 = new Song('There must be an angel', "05.00", "Eurythmics")
const m1 = new Movie('Man of steel', 2012, "02:33:14")


playList.add(s1)
playList.add(s2)
playList.add(s3)
playList.add(m1)

playList.render(el)

document.addEventListener('click', e => {
    const btn = e.target;
    if(!btn.closest('#btn-player')) {
        return;
    }
    switch(btn.id) {
        case 'btn-play': playList.play(); break;
        case 'btn-stop':  playList.stop();  break;
        case 'btn-next': playList.next();  break;
    }
    playList.render(el);
})