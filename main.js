const $ = e => document.getElementById(e);

const remove_hooktube = () => {     
  let hooktube = $("hooktube");
  if(hooktube) {
    hooktube.parentElement.removeChild(hooktube);
  }
};

window.addEventListener("yt-navigate-start", () => {
  remove_hooktube();

  if (this.vp) this.vp.stop();
});

window.addEventListener("yt-navigate-finish", () => {
  for (const video of [...document.getElementsByTagName("video")]) {
    video.pause();
    video.onplaying = () => video.pause();
  }

  let player_continer = $("player-container");
  try {
    let video_id = window.location.href.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1];
    let iframe = document.createElement("iframe");

    iframe.setAttribute("id", "hooktube");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.setAttribute("src", `https://hooktube.com/embed/${video_id}`);

    player_continer.parentNode.insertBefore(iframe, player_continer);

  } catch(e) {
    remove_hooktube();
  }
});

