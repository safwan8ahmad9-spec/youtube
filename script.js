async function main(){
let a= await fetch("/info.json");
let video=await a.json();

let container=document.querySelector(".cardcontainer");
console.log(container);

let htmlcontent='';
video.forEach(function(video){
    htmlcontent+=` <div class="card " onclick="openPlayer('${video.id}')">
                <img src="${video.thumbnail}"">
                <div class="d">
                <p>${video.title}</p>
                <img src="img/threedot.svg" alt=""></div>
                <p class="title">${video.channelName}</p>
                <div class="title">
                    <p>${video.views}</p>
                    <p>${video.uploadDate}</p>
                </div>
                </div>                   
                `
})
container.innerHTML=htmlcontent;}
function openPlayer(videoId){
    console.log(videoId)
    window.location.href=`play.html?id=${videoId}`
}

main()
