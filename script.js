let musics = [
    {title:'Revenge', artist:'XXXTentacion', src:'musics/revenge.mp3', img:'images/revenge-icon.jpg'},
    {title:'Sweater Weather', artist:'The Neighbourhood', src:'musics/sweater-weather.mp3', img:'images/sweater-weather-icon.jpg'},
    {title:'Counting Stars', artist:'One Republic', src:'musics/counting-stars.mp3', img:'images/counting-stars-icon.jpg'}  
];

let music = document.querySelector('audio')
let indexMusic = 0;

let durationMusic = document.querySelector('.end');
let image = document.querySelector('img');
let musicName = document.querySelector('.description h2');
let artistName = document.querySelector('.description i');

renderMusic(indexMusic);

//Events
document.querySelector('.play-bhutan').addEventListener('click', playMusic);
document.querySelector('.pause-bhutan').addEventListener('click', pauseMusic);
music.addEventListener('timeupdate', updateBar);
document.querySelector('.previous').addEventListener('click', () => {
    indexMusic--;
    if(indexMusic < 0){
        indexMusic = 2;
    }
    renderMusic(indexMusic);
});

document.querySelector('.next').addEventListener('click', () => {
    indexMusic++;
    if(indexMusic > 2){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
});

//Functions
function renderMusic(index){
    music.setAttribute('src', musics[index].src);
    music.addEventListener('loadeddata', () => {
        musicName.textContent = musics[index].title;
        artistName.textContent = musics[index].artist;
        image.src = musics[index].img;
        durationMusic.textContent = secondsToMinute(Math.floor(music.duration));
    });
}

function playMusic(){
    music.play();
    document.querySelector('.pause-bhutan').style.display = 'block';
    document.querySelector('.play-bhutan').style.display = 'none';
}

function pauseMusic(){
    music.pause();
    document.querySelector('.pause-bhutan').style.display = 'none';
    document.querySelector('.play-bhutan').style.display = 'block';
}

function updateBar(){
    let bar = document.querySelector('progress');
    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
    let elapsedTime = document.querySelector('.start')
    elapsedTime.textContent = secondsToMinute(Math.floor(music.currentTime));
}

function secondsToMinute(seconds){
    let fieldMinutes = Math.floor(seconds / 60);
    let fieldSeconds = seconds % 60;
    if(fieldSeconds < 10){
        fieldSeconds = '0' + fieldSeconds;
    }

    return fieldMinutes+':'+fieldSeconds;
}