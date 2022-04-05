// Прокрутка по верхней навигации
(function() {
    const menuLinks = document.querySelectorAll('.header__nav_li[data-goto]');

    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener('click', e => {
                const menuLink = e.target;
                
                if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                    const gotoBlock = document.querySelector(menuLink.dataset.goto);
                    // плавный скролл
                    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                    window.scrollTo({
                        top: gotoBlockValue,
                        behavior: 'smooth'
                    });
                    e.preventDefault();
                }
            });
        });
    }
})();

// Музыкальный плеер
(function() {

    const songs = document.querySelectorAll('.audio[data-song]');

    songs.forEach((elem, index) => {
        elem.innerHTML = `
                        <span class="audio__active">
                            <img class="" src="img/play.svg" alt="" id="playButton_${index}">
                        </span>
                        <span class="audio__time">
                            <span class="audio__time_now" id="audioCurrentTime_${index}"></span>
                            <span>/</span>
                            <span class="audio__time_end" id="audioDuration_${index}"></span>
                        </span>
                        <span class="audio__line" id="audioLine_${index}">
                            <span class="audio__circle" id="audioCircle_${index}"></span>
                            <span class="audio__line_progress" id="audioLineProgress_${index}"></span>
                        </span>
                        <span class="audio__volume" id="audioVolume_${index}">
                            <span class="audio__volume_background">
                                <span class="audio__volume_line" id="audioVolumeLine_${index}">
                                    <span class="audio__circle" id="audioCircleVolume_${index}"></span>
                                    <span class="audio__line_progress" id="audioLineProgressVolume_${index}"></span>
                                </span>
                            </span>
                            <img src="img/volume.svg" alt="">
                        </span>`;
        newAudio(elem.getAttribute('data-song'), index)
    })
    
    function newAudio(audioSrc, index) {
        const audio = new Audio(audioSrc);
        const playButton = document.getElementById(`playButton_${index}`);
        const audioCurrentTime = document.getElementById(`audioCurrentTime_${index}`);
        const audioDuration = document.getElementById(`audioDuration_${index}`);
        const audioLine = document.getElementById(`audioLine_${index}`);
        const audioCircle = document.getElementById(`audioCircle_${index}`);
        const audioLineProgress = document.getElementById(`audioLineProgress_${index}`);
        const audioVolume = document.getElementById(`audioVolume_${index}`); 
        const audioVolumeLine = document.getElementById(`audioVolumeLine_${index}`);
        const audioCircleVolume = document.getElementById(`audioCircleVolume_${index}`);
        const audioLineProgressVolume = document.getElementById(`audioLineProgressVolume_${index}`);
        
        function playAudio() {
            if (audio.paused) {

                playButton.src = 'img/pause.svg';
                audio.play();
                return setInterval(updateProgress, 1000);
            }
            
            playButton.src = 'img/play.svg';
            return audio.pause();
        }
    
        function updateProgress(elem = audioLine) {
            audioCurrentTime.textContent = `${Math.floor(audio.currentTime/60)}:${Math.ceil(audio.currentTime%60) < 10 ? '0' + Math.ceil(audio.currentTime%60): Math.ceil(audio.currentTime%60)}`;
            audioCircle.style.marginLeft = `${Math.floor(audio.currentTime/audio.duration * elem.clientWidth) - 5}px`;
            audioLineProgress.style.width = `${Math.floor(audio.currentTime/audio.duration * elem.clientWidth)}px`;
        }
        
        function setProgress(e) {
            const clientWidth = this.clientWidth;
            const clickX = e.offsetX;
            audio.currentTime = (clickX / clientWidth) * audio.duration;
    
            updateProgress();
        }
    
        function setVolume(e) {
            if (!localStorage.songVolume) {
                localStorage.setItem('songVolume', 100);
            }

            let clientWidth;
            clientWidth = this.clientWidth ? this.clientWidth : audioVolumeLine.clientWidth;
            let clickX;
            clickX = e.offsetX ? e.offsetX : localStorage.songVolume;
    
            audio.volume = Math.floor((clickX / clientWidth) * 100) / 100;
            localStorage.setItem('songVolume', audio.volume)
    
            audioCircleVolume.style.marginLeft = `${Math.floor(audio.volume * clientWidth) - 5}px`;
            audioLineProgressVolume.style.width = `${Math.floor(audio.volume * clientWidth)}px`;
        }
        
        audioVolumeLine.addEventListener('click', setVolume);
        audioLine.addEventListener('click', setProgress);
    
        audioVolume.addEventListener('mouseover', () => {
            if (!localStorage.songVolume) {
                localStorage.setItem('songVolume', 100);
            }

            audio.volume = localStorage.songVolume;

            audioCircleVolume.style.marginLeft = `${Math.floor(localStorage.songVolume * audioVolumeLine.clientWidth) - 5}px`;
            audioLineProgressVolume.style.width = `${Math.floor(localStorage.songVolume * audioVolumeLine.clientWidth)}px`;
        });
    
        setTimeout(() => {
            audioCurrentTime.textContent = `${Math.floor(audio.currentTime/60)}:${Math.ceil(audio.currentTime%60) < 10 ? '0' + Math.ceil(audio.currentTime%60): Math.ceil(audio.currentTime%60)}`;
            audioDuration.textContent = `${Math.floor(audio.duration/60)}:${Math.ceil(audio.duration%60) < 10 ? '0' + Math.ceil(audio.duration%60): Math.ceil(audio.duration%60)}`;
        }, 300);
    
        playButton.onclick = playAudio;
    };

    
})();

// медленная загрузка видео из ютуба 
(function() {
    const topPopularVideos = document.querySelector('.top-popular__videos');

    if (topPopularVideos) {
        const videos = [
            {title: 'Janji - Heroes Tonight (feat. Johnning)', src: 'https://www.youtube.com/embed/3nQNiWdeH2Q'},
            {title: 'DEAF KEV - Invincible', src: 'https://www.youtube.com/embed/J2X5mJ3HDYE'},
            {title: 'Cartoon - On & On (feat. Daniel Levi)', src: 'https://www.youtube.com/embed/K4DyBUG242c'},
        ];

        function lazyLoadingVideos(array, i, ms) {
            if (array.length === 0) {
                return topPopularVideos.innerHTML = `<h4 class="top-popular__videos_name">
                Видео нет
                </h4>`;
            }

            if (array.length <= i) {
                return;
            }

            if (document.querySelector('.top-popular__videos_item')) {
                let li = document.createElement('li')

                li.className = 'top-popular__videos_item';
                li.id = `topPopularVideosItem_${i}`;

                li.innerHTML = `
                                <h4 class="top-popular__videos_name">
                                    ${array[i].title}
                                </h4>
                                <div class="top-popular__video">
                                    <div class="top-popular__video-inner">
                                        <iframe width="100%" height="100%" src="${array[i].src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                </div>`;

                topPopularVideos.append(li);

            } else {
                topPopularVideos.innerHTML = `
                                <li class="top-popular__videos_item" id="topPopularVideosItem_${i}">
                                    <h4 class="top-popular__videos_name">
                                    ${array[i].title}
                                    </h4>
                                    <div class="top-popular__video">
                                        <div class="top-popular__video-inner">
                                            <iframe width="100%" height="100%" src="${array[i].src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </li>`;
            }

            setTimeout(() => {
                i += 1;
                return lazyLoadingVideos(array, i, ms);
            }, ms)
        }

        lazyLoadingVideos(videos, 0, 1000);
    }
})();


// Бургер меню
(function() {
    const burgerButton = document.querySelector('.header__burger-menu');
    const burgerMenu = document.querySelector('.header__nav_ul');


    function toggleActive(element) {
        element.classList.toggle('_active');
    }

    if (burgerButton) {
        burgerButton.addEventListener('click', e => {
            toggleActive(burgerButton);
            toggleActive(burgerMenu);
            document.body.classList.toggle('_lock');
        });
    }
})();