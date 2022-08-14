const data = {
    songs:[
        {
            name: 'Hymn For The Weekend',
            singer: 'Grapry Ponte',
            image: './assets/images/img-1.jpg',
            path: '/assets/songs/song1.mp3'

        },
        {
            name: 'Hawk Nelson',
            singer: 'Sold Out',
            image: './assets/images/img-2.png',
            path: './assets/songs/song2.mp3'

        },
        {
            name: 'Monsters',
            singer: 'Katie Sky',
            image: './assets/images/img-3.jpg',
            path: '/assets/songs/song3.mp3'

        },
        {
            name: 'Thunde',
            singer: 'Coldplay _ Alan Walker',
            image: './assets/images/img-4.jpg',
            path: '/assets/songs/song4.mp3'

        },
        {
            name: 'Wrap Me In Plastic',
            singer: 'Chromance',
            image: './assets/images/img-5.jpg',
            path: '/assets/songs/song5.mp3'

        },

    ]
};

        // console.log(data)
//player
const playsong = document.querySelector('.play-music');
const hidelist = document.querySelector('#closeplayer');
// console.log(hidelist)
const next = document.querySelector('#next');

const random = document.querySelector('.random');
// console.log(random)
const previous = document.querySelector('#previous');
const undo = document.querySelector('.undo');
const main = document.querySelector('.main');
// console.log(main);
//player1
const player_img = document.querySelector('.player .player-img img');
const player_name = document.querySelector('.player .player-name h3');
const player_singer = document.querySelector('.player .player-name p');
const main_audio = document.querySelector('#audio');

//player2
const player2_img = document.querySelector('.banner img');
const player2_name = document.querySelector('.banner h3');
const player2_singer = document.querySelector('.banner  p');

const endTime = document.querySelector('#endtime');

const processArea = document.querySelector('.process-area')

const play2 = document.querySelector('#play-music');

// processbar

const processbar = document.querySelector('.process-bar')
 // console.log(processbar)
// console.log(player2_name)



//List
const ListHtml = document.querySelector('.list');
// console.log(ListHtml)
const list = document.querySelector('#list');
const play_list = document.querySelector('#play_list');
const next_list = document.querySelector('#next_list');

const previous_list = document.querySelector('#previous_list');
// console.log(previous_list)
const openplayer = document.querySelector('.player-info');

// console.log(previous_list);

// console.log(main_audio.currentTime);


var index = 0;
function getList (){
    
    const listhtmls = data.songs.map((song,index) =>{
        
        return`<div class="list-item" id = ${index}>
        <div class="list-img">
            <img src="${song.image}" alt="">
        </div>
        <div class="list-songname">
            <h3>${song.name}</h3>
            <p>${song.singer}</p>
        </div>
        <div class="list-time">
            <span></span>
        </div>
    </div>`
    
    });
    
    ListHtml.innerHTML = listhtmls.join('');
}
getList();
const listMusic = document.querySelectorAll('.list-item');
listMusic.forEach(music => {
    music.addEventListener('click', () =>{
        let id = music.getAttribute('id');
        LoadMusic(id);
    })
})
const Thumbnail = player2_img.animate([
    {transform: 'rotate(360deg)'}],
    {
        duration:10000,
        iterations: Infinity
    }
)

Thumbnail.pause();
function LoadMusic (index){
    if(undo.classList.contains('active')){
        ReplayAudio();
    }
    // console.log(index)
    player_img.src =  data.songs[index].image;
    player_name.innerText = data.songs[index].name;
    player_singer.innerText = data.songs[index].singer;
    // player2
    player2_img.src =  data.songs[index].image;
    player2_name.innerText = data.songs[index].name;
    player2_singer.innerText = data.songs[index].singer;
    main_audio.src = data.songs[index].path;
    playMusic();
}
LoadMusic (index);

var flag;
main_audio.onplay = function(){
    flag = true;
    play_list.classList.remove('fa-play');
    play_list.classList.add('fa-pause');
    ///
    play2.classList.remove('fa-play');
    play2.classList.add('fa-pause');
}
main_audio.onpause = function(){
    flag = false;
    play_list.classList.remove('fa-pause');
    play_list.classList.add('fa-play');
    // ////////
    play2.classList.remove('fa-pause');
    play2.classList.add('fa-play');
    
}

function playMusic(flag) {
    if(flag){
        main_audio.pause();
        Thumbnail.pause();
    }else{
        main_audio.play();
        Thumbnail.play();
    }   
   
}
function nextMusic(index){
    LoadMusic(index);
    playMusic();
}
function prevMusic(index){
    LoadMusic(index);
    playMusic();
    
}


function RandomMusic(index){
    let newIndex;
    // do{
        newIndex = Math.floor(Math.random() * data.songs.length);
    // }while(newIndex === index);
    index = newIndex;
    LoadMusic (index);
}

main_audio.ontimeupdate = function(){
    const processbarWidth =  (main_audio.currentTime / main_audio.duration) *100;
    processbar.style.width = processbarWidth + '%';
    let currenttime = document.querySelector('#currenttime');
    let totalMin = (Math.floor(main_audio.currentTime / 60));
    let totalSec =(Math.floor(main_audio.currentTime % 60));
    currenttime.innerText = `${totalMin}:${totalSec}`;

   
}

main_audio.onended = function(){
    nextMusic(index++);
}

function ReplayAudio(){
    main_audio.currentTime = 0;
    // playMusic();
    LoadMusic (index);
}

processArea.addEventListener('click',(e)=>{
    let Totalwidth = processArea.clientWidth;
    console.log(Totalwidth);
    let currentWidth = e.offsetX;
    console.log(currentWidth);
    let songTime = main_audio.duration;
    main_audio.currentTime = (currentWidth / Totalwidth ) * songTime;
})
//Main Audio
main_audio.addEventListener('loadeddata',()=>{
    const duration = main_audio.duration;
    let endtime = document.querySelector('#endtime');
    let totalMin = (Math.floor(duration / 60));
    let totalSec =(Math.floor(duration % 60));
    endtime.innerText = `${totalMin}:${totalSec}`;

});

play_list.addEventListener('click',()=>{
    playMusic(flag);
})
play2.addEventListener('click',()=>{
    playMusic(flag);
    
})

next_list.addEventListener('click',()=>{
    const length = data.songs.length;
    if(index >= length ){
        index = 0;
    }
    

    if(random.classList.contains('active')){
        RandomMusic(index);
    }
   else{
        nextMusic(index++);
    }
    
});
previous_list.addEventListener('click',()=>{
    if(index < 0 ){
        index = data.songs.length -1;
    }
    if(random.classList.contains('active')){
        RandomMusic(index)
    }
   else{
    prevMusic(index--);
}
})

openplayer.addEventListener('click',()=>{
    list.classList.add('hide');
    main.classList.remove('hide');
});
hidelist.addEventListener('click',()=>{
    list.classList.remove('hide');
    main.classList.add('hide');
})

next.addEventListener('click',()=>{
    const length = data.songs.length;
    if(index >= length ){
        index = 0;
    }
    if(random.classList.contains('active')){
        RandomMusic(index)
    }
   else{
    nextMusic(index++);
}
});
previous.addEventListener('click',()=>{
    if(index < 0 ){
        index = data.songs.length -1;
    }
    if(random.classList.contains('active')){
        RandomMusic(index)
    }
   else{
    prevMusic(index--);
}
})

random.addEventListener('click', ()=>{
    random.classList.toggle('active');
    // RandomMusic(index);
})

undo.addEventListener('click', ()=>{
    undo.classList.toggle('active');

});
