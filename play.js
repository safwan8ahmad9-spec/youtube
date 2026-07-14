function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}



let urlParams=new URLSearchParams(window.location.search);
let videoId=parseInt(urlParams.get('id'));
async function loadvideo(){
    let response=await fetch('info.json');
    let videodata=await response.json();
    let selectedVideo=videodata.find((vid)=> vid.id===videoId)
    if(selectedVideo){
        document.getElementById('myvideoplayer').src=selectedVideo.videoSrc;
        document.getElementById('vidTitle').innerText=selectedVideo.title;
        document.getElementById("ideo-channel").innerText=`${selectedVideo.channelName} - ${selectedVideo.views}`
    }
    else{
        document.getElementById('vidTitle').innerText="video not found";
    }
    let container=document.querySelector(".videocont");
    console.log(container);
let htmlcontent='';
videodata.forEach(function(video){
    htmlcontent+=` <div class="card1" onclick="openPlayer('${video.id}')">
                    <img src="${video.thumbnail}" alt="">
                    <div class="carddetail">
                        <div class="d1">
                        <h3 class="cardtitle">${video.title}</h3>
                        <img src="img/threedot.svg" alt="" class="threedot">
                        </div>
                        <p class="cardchannel">${video.channelName}</p>
                        <div class="title1">
                            <p class="cardviews">${video.views}</p>
                            <p class="cardtime">1 day ago</p>
                        </div></div>
                        </div>
 `});
 container.innerHTML=htmlcontent;
 const videoPlayer = document.getElementById('myvideoplayer');
 const next=document.getElementById('next');
 const prev=document.getElementById('prev');
 const play=document.getElementById('play');
 const songname=document.querySelector('.songinfo p');
 const volumeSlider = document.getElementsByClassName('volume');
 const songtime = document.getElementsByClassName('songtime');
 let currentVideoIndex = videodata.findIndex((vid) => vid.id === videoId);
 play.addEventListener('click', () => {
    if (videoPlayer.paused) {
        videoPlayer.play();
        play.src = 'img/pause.svg';
    } else {
        videoPlayer.pause();
        play.src = 'img/play.svg';
    }
 });
 videoPlayer.addEventListener('play', () => {
    play.src = 'img/pause.svg';
 });
 videoPlayer.addEventListener('pause', () => {
    play.src = 'img/play.svg';
 });
 next.addEventListener('click', () => {
    currentVideoIndex=(currentVideoIndex + 1) % videodata.length;
    console.log(currentVideoIndex);
    
    const nextVideo = videodata[currentVideoIndex];
    videoPlayer.src = nextVideo.videoSrc;
    document.getElementById('vidTitle').innerText = nextVideo.title;
    document.getElementById("ideo-channel").innerText = `${nextVideo.channelName} - ${nextVideo.views}`;
    videoPlayer.play();
    play.src = 'img/pause.svg';
});
prev.addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex - 1 + videodata.length) % videodata.length;
    console.log(currentVideoIndex);
    const prevVideo = videodata[currentVideoIndex];
    videoPlayer.src = prevVideo.videoSrc;
    document.getElementById('vidTitle').innerText = prevVideo.title;
    document.getElementById("ideo-channel").innerText = `${prevVideo.channelName} - ${prevVideo.views}`;
    videoPlayer.play();
    play.src = 'img/pause.svg';
});
volumeSlider[0].addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    videoPlayer.volume = volume;
})
 document.querySelector(".volume>img").addEventListener("click", (e) => {
        if (e.target.src.includes("img/volume.svg")) {
            e.target.src = e.target.src.replace("img/volume.svg", "img/mute.svg");
            videoPlayer.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        } else {
            e.target.src = e.target.src.replace("img/mute.svg", "img/volume.svg");
            videoPlayer.volume = 0.10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
    });
songtime[0].getElementsByTagName("p")[0].innerText = secondsToMinutesSeconds(videoPlayer.currentTime);
videoPlayer.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerText = secondsToMinutesSeconds(videoPlayer.currentTime)+" / "+secondsToMinutesSeconds(videoPlayer.duration);
    let progressPercent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    document.querySelector(".circle").style.left = progressPercent + "%";
});
songname.innerText=selectedVideo.title;
console.log(selectedVideo.title);

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.currentTarget.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        videoPlayer.currentTime = (videoPlayer.duration * percent) / 100;
    });
let searchInput = document.getElementById("search-input");
if (searchInput !== null) {
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      let searchQuery = searchInput.value.toLowerCase().trim();
      if(searchQuery==="") return;
      let allCards=document.querySelectorAll(".card1 ");      
      let isfound=false;
      for(let i=0;i<allCards.length;i++){
        let cardTitle=allCards[i].innerText.toLowerCase();
        if(cardTitle.includes(searchQuery)){         
          allCards[i].scrollIntoView({behavior:"smooth",block:"center"});
          let originalbg=allCards[i].style.backgroundColor;
          allCards[i].style.backgroundColor="#cddef3d2";
          setTimeout(()=>{
            allCards[i].style.backgroundColor=originalbg;
          },3000);
           isfound=true;
           break;
        }
      }
      if(!isfound){
        alert("No matching product found.");
      }
    }
  });
}



}
function openPlayer(videoId){
    console.log(videoId)
    window.location.href=`play.html?id=${videoId}`

}

loadvideo()
