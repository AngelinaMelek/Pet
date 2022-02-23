import Song from "./song";
import Movie from "./movie";
import PlayList from "./playlist";

const el = document.getElementById("list");
const playList = new PlayList();
const s1 = new Song("Yellow submarine", 4.22, "The Beatles");
const s2 = new Song("There must be an angel", 5.12, "Utitmics");
const s3 = new Song("The Feeling", 3.55, "Justin Beber");

const m1 = new Movie("Man of steel", 2012, "02:33:15");

playList.add(s1);
playList.add(s2);
playList.add(s3);
playList.add(m1);

playList.render(el);

document.addEventListener("click", (e) => {
  const btn = e.target;
  switch (btn.id) {
    case "btn-play":
      playList.play();
      break;
    case "btn-stop":
      playList.stop();
      break;
    case "btn-next":
      playList.next();
      break;
  }
  playList.render(el);
});
