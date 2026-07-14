async function main(){
let a= await fetch("/info.json");
let video=await a.json();

let container=document.querySelector(".cardcontainer");
console.log(container);

let htmlcontent='';
video.forEach(function(video){
    htmlcontent+=` <div class="card " onclick="openPlayer('${video.id}')">
                <img src="${video.thumbnail}"">
                <div class="d1">
                <p>${video.title}</p>
                <img src="img/threedot.svg" alt="" ></div>
                <p class="title">${video.channelName}</p>
                <div class="title">
                    <p>${video.views}</p>
                    <p>${video.uploadDate}</p>
                </div>
                </div>                   
                `
})
container.innerHTML=htmlcontent;
let searchInput = document.getElementById("search-input");
if (searchInput !== null) {
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      let searchQuery = searchInput.value.toLowerCase().trim();
      if(searchQuery==="") return;
      let allCards=document.querySelectorAll(".card ");      
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

main()
