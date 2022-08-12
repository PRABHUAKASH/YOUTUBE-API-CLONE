const Container = document.querySelector('.video-container');

let videolink = "https://www.googleapis.com/youtube/v3/videos?";
let channellink = "https://www.googleapis.com/youtube/v3/channels?";
let playlistlink = "https://youtube.googleapis.com/youtube/v3/playlists?"

fetch(videolink + new URLSearchParams({
    key: "AIzaSyBIqs0kEwfIXiOpHItrohgrf1Z-OQFl2ko",
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 25,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getIcon(item);
    })
})
.catch(err => console.log(err));



const getIcon = (video_data) => {
    fetch(channellink + new URLSearchParams({
        key: "AIzaSyBIqs0kEwfIXiOpHItrohgrf1Z-OQFl2ko",
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        VideoCard(video_data);
    })
}
let grtIcon = (play_data) =>{
    fetch(playlistlink + new URLSearchParams({
        key : "AIzaSyBIqs0kEwfIXiOpHItrohgrf1Z-OQFl2ko",
        part: 'snippet',
        id: play_data.snippet.channelId
    }))

    .then(res => res.json())
    .then(data => {
        play_data.channelThumbnail = data.items[1].snippet.thumbnails.default.url;
        VideoCard(play_data);
    })
}


const VideoCard = (data) => {
    Container.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}



const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
        
    }
})


  
    const subscriberCount= document.getElementById('Subscriberid');
    const viewCount = document.getElementById('views');
    const videoCount = document.getElementById('videocount');
    
   
    let mydata = () => {
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${'UCY6KjrDBN_tIRFT_QNqQbRQ'}&key=${"AIzaSyBIqs0kEwfIXiOpHItrohgrf1Z-OQFl2ko"}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            subscriberCount.value = data["items"][0].statistics.subscriberCount;
            viewCount.value = data["items"][0].statistics.viewCount;
            videoCount.value = data["items"][0].statistics.videoCount;
            

            
        })
    }
   mydata();