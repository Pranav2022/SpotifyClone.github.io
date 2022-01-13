console.log("Hello world");
// Initializing variables
let songIndex = 0; 
let audioElement = new Audio('/songs/1.mp3');
let mastername = document.getElementById('mastername');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressbar')
let songGif = document.getElementById('songGif')
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName :"Song",songPath : "/songs/1.mp3",songCover:"/covers/1.jpg"},
    {songName :"Song1",songPath : "/songs/2.mp3",songCover:"/covers/2.jpg"},
    {songName :"Song2",songPath : "/songs/3.mp3",songCover:"/covers/3.jpg"},
    {songName :"Song3",songPath : "/songs/4.mp3",songCover:"/covers/4.jpg"},
    {songName :"Song4",songPath : "/songs/5.mp3",songCover:"/covers/5.jpg"},
    {songName :"Song5",songPath : "/songs/6.mp3",songCover:"/covers/6.jpg"},
    {songName :"Song6",songPath : "/songs/7.mp3",songCover:"/covers/7.jpg"},
    {songName :"Song7",songPath : "/songs/8.mp3",songCover:"/covers/8.jpg"},
    {songName :"Song8",songPath : "/songs/9.mp3",songCover:"/covers/9.jpg"},
    {songName :"Song9",songPath : "/songs/10.mp3",songCover:"/covers/10.jpg"},
    {songName :"Kalimba",songPath : "/songs/11.mp3",songCover:"/covers/11.PNG"},
    {songName :"Maid with the Flaxen Hair",songPath : "/songs/12.mp3",songCover:"/covers/12.PNG"},
    {songName :"Sleep Away",songPath : "/songs/13.mp3",songCover:"/covers/13.PNG"},
]
// for iterating songs n image 
songItem.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].songCover;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
    // element.getElementsByClassName("time")[0].innerText = audioElement.duration;
    // element.getElementsByClassName("timestamp")[0].innerText = audioElement.duration;
})

// audioElement.play();

// handle play/pause click 

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused ||  audioElement.currentTime <= 0){
        audioElement.play();
        songGif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        songGif.style.opacity = 0;
        document.getElementById(songIndex).classList.remove('fa-pause-circle');
        document.getElementById(songIndex).classList.add('fa-play-circle');
    }
})

// Listen to events 

audioElement.addEventListener('timeupdate',()=>{
    console.log("timeupdate");
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    console.log(audioElement.currentTime);
    myProgressBar.value = progress;
    // update seekbar
})



myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
    // console.log(myProgressBar.value);

})

const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle')
        element.classList.remove('fa-pause-circle')
    })
}



Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused || audioElement.currentTime <= 0){
            console.log(e.target);
            makeallplays();
            songIndex = parseInt(e.target.id);
            // document.getElementById('songname').innerText = songs[songIndex+1].songName;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.currentTime =0;
            audioElement.src = `/songs/${songIndex+1}.mp3`;
            // mastername.innerText = songs[songIndex].songName;
            document.getElementById('mastername').innerText = songs[songIndex].songName;
            audioElement.play();
            songGif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
    }
    // else if()
    else{
        console.log(e.target);
        songIndex = parseInt(e.target);
        audioElement.pause();
        songGif.style.opacity = 0;
        makeallplays();
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
    }
    })
})



audioElement.addEventListener('timeupdate',()=>{
    console.log("timeupdate");

    if(audioElement.currentTime == audioElement.duration){
        songIndex+=1
        console.log(songIndex)
        audioElement.src = `/songs/${songIndex}.mp3`;
        mastername.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
    }
    // else{

    //     songIndex = 0;
    //     audioElement.src = `/songs/${songIndex}.mp3`;
    //     mastername.innerText = songs[songIndex].songName;
    //     audioElement.currentTime = 0;
    //     audioElement.play();
    // }
})
document.getElementById('next').addEventListener('click',()=>{
   if(songIndex >= 12){
       songIndex = 0;
    }
   else{
       songIndex+=1;
    }
   audioElement.currentTime =0;
   audioElement.src = `/songs/${songIndex+1}.mp3`;
   mastername.innerText = songs[songIndex].songName;
   audioElement.play();
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
   makeallplays();
   document.getElementById(songIndex).classList.remove('fa-play-circle')
   document.getElementById(songIndex).classList.add('fa-pause-circle')
})
document.getElementById('previous').addEventListener('click',()=>{
   if(songIndex <= 0){
       songIndex = 12;
    }
   else{
       songIndex-=1;
    }
   audioElement.currentTime =0;
   audioElement.src = `/songs/${songIndex+1}.mp3`;
   mastername.innerText = songs[songIndex].songName;
   audioElement.play();
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
   makeallplays();
   document.getElementById(songIndex).classList.remove('fa-play-circle')
   document.getElementById(songIndex).classList.add('fa-pause-circle')
})

// songIndex.addEventListener('click',()=>{
//     if(audioElement.paused || audioElement.currentTime<=0){
//         songGif.style.opacity = 1;
//         songIndex.target.classList.remove('fa-play-circle');
//         songIndex.target.classList.add('fa-pause-circle');
//         masterPlay.classList.remove('fa-play-circle')
//         masterPlay.classList.add('fa-pause-circle')
//     }
// })

