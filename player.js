const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const moreManu = $('.moreManu');
const icon = $('#icon');
const songList = $('.songList');
const header = $('#header');
const CD = $('.CD img');
const CDWidth = CD.offsetWidth;
const CDHeight = CD.offsetHeight;
const toolsBox = $('.tools--box');
const songTime = $('.songTime');
const audio = $('#audio');
const playBtn = $('.tools--play');
const pauseBtn = $('.tools--pause');
const titleName = $('#currentNameSong');
const nextBtn = $('.tools--next');
const prevBtn = $('.tools--prev');
const playBtnClasses = playBtn.classList;
const pauseBtnClasses = pauseBtn.classList;
let timeTool = $('.time--tool');
const randomBtn = $('.tools--random i');
const loopBtn = $('.tools--loop i');
const Manu = {
    click: function() {
        icon.addEventListener('click', function() {
            const check = moreManu.classList;
            check.forEach(function(node, index) {
                if (node == 'none') {
                    moreManu.classList.remove('none')
                } else(moreManu.classList.add('none'))
            })
        });
    },
    start: function() {
        this.click();
    }
}
Manu.start();


const Song = {
    currentSongIndex: 0,
    isPlaying: false,
    song: [{
            id: 1,
            songName: 'chạy ngay đi',
            singer: 'Sơn Tùng - MTP',
            pathSong: './music/ChayNgayDiBeat-SonTungMTP-5523929.mp3',
            linkImg: './picture/pic1.jpg'
        },
        {
            id: 2,
            songName: 'we dem boyz',
            singer: 'Wizkhalifa',
            pathSong: './music/WeDemBoyz-WizKhalifa-6432092.mp3',
            linkImg: './picture/pic2.jpg'
        },
        {
            id: 3,
            songName: 'senorita',
            singer: 'ShawMendes_CamilaCabello',
            pathSong: './music/Seorita-ShawnMendesCamilaCabello-6007813.mp3',
            linkImg: './picture/pic3.jpg'
        },
        {
            id: 4,
            songName: 'đánh mất em',
            singer: 'Đăng Quang Trần',
            pathSong: './music/DanhMatEm-QuangDangTran-6677870.mp3',
            linkImg: './picture/pic4.jpg'
        }, {
            id: 5,
            songName: 'muộn rồi mà sao còn',
            singer: 'Sơn Tùng-MTP',
            pathSong: './music/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3',
            linkImg: './picture/pic5.jpg'
        }, {
            id: 6,
            songName: 'chúng ta sau này',
            singer: 'TRI',
            pathSong: './music/ChungTaSauNay-TRI-6929586.mp3',
            linkImg: './picture/pic6.jpg'
        }, {
            id: 7,
            songName: 'níu duyên',
            singer: 'Lê Bảo Bình',
            pathSong: './music/NiuDuyen-LeBaoBinh-6872127.mp3',
            linkImg: './picture/pic7.jpg'
        }, {
            id: 8,
            songName: 'Câu hẹn câu thề',
            singer: 'Đình Dũng',
            pathSong: './music/CauHenCauThe-DinhDung-6994741.mp3',
            linkImg: './picture/pic8.jpg'
        }, {
            id: 9,
            songName: 'sai lầm của anh',
            singer: 'Đình Dũng',
            pathSong: './music/SaiLamCuaChungTa-NQP-7073779.mp3',
            linkImg: './picture/pic9.jpg'
        }, {
            id: 10,
            songName: 'Sài gòn đau lòng quá',
            singer: 'Hoàng Duyên',
            pathSong: './music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3',
            linkImg: './picture/pic10.jpg'
        }
    ],
    render: function() {
        const htmls = this.song.map(function(song) {
            return ` 
            <div onclick='Song.songOnClick(${song.id})' class="itemMusic">
                <img src="${song.linkImg}" alt="">
                <div class="songinf">
                    <h1>${song.songName}</h1>
                    <div class="content">${song.singer}</div>
                </div>
            </div>
            `
        });
        songList.innerHTML = htmls;
    },
    Scroll: function() {
        document.onscroll = function() {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const newCDWidth = CDWidth - scrollY;
            if (newCDWidth > 0) {
                CD.style.width = newCDWidth + 'px';
                CD.style.height = newCDWidth + 'px';
            } else {
                CD.style.width = '0px';
                CD.style.height = '0px';
            }
            if (newCDWidth <= 0) {
                songTime.style.marginTop = '-25px';
            } else { songTime.style.marginTop = '0px'; }
        }
    },
    renderCurrentSongHandle: function() {
        playBtn.onclick = function() {
            playBtnClasses.add('play');
            pauseBtnClasses.remove('pause');
            audio.play();
        }
        pauseBtn.onclick = function() {
            playBtnClasses.remove('play');
            pauseBtnClasses.add('pause');
            audio.pause();
        }
    },
    getCurrentSong: function() {
        return this.song[this.currentSongIndex];
    },
    renderCurrentSong: function() {
        titleName.textContent = this.getCurrentSong().songName;
        CD.src = this.getCurrentSong().linkImg;
        audio.src = this.getCurrentSong().pathSong;
    },
    NextPrevBtn: function() {
        nextBtn.onclick = function() {
            if (randomBtn.style.color === 'red') {
                Song.randomActive();
            } else {
                if (Song.currentSongIndex >= Song.song.length - 1) {
                    Song.currentSongIndex = 0;
                } else { Song.currentSongIndex++; }
                Song.renderCurrentSong();
                playBtnClasses.add('play');
                pauseBtnClasses.remove('pause');
                audio.play();
            }
        }
        prevBtn.onclick = function() {
            if (randomBtn.style.color === 'red') {
                Song.randomActive();
            } else {
                if (Song.currentSongIndex <= 0) {
                    Song.currentSongIndex = Song.song.length - 1;
                } else { Song.currentSongIndex--; }
                Song.renderCurrentSong();
                playBtnClasses.add('play');
                pauseBtnClasses.remove('pause');
                audio.play();
            }
        }
    },
    CDHandle: function() {
        const CDActive = CD.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 10000,
            iterations: Infinity
        })
        CDActive.pause();
        audio.onpause = function() {
            CDActive.pause();
        };
        audio.onplay = function() {
            CDActive.play();
        };
    },
    audioHandle: function() {
        audio.ontimeupdate = function() {
            const timeNow = audio.currentTime;
            let timeOfSong = audio.duration;
            let percentTime = timeNow != 0 ? (timeNow / timeOfSong) * 100 : 0;
            timeTool.value = percentTime;
            if (percentTime === 100) {
                if (randomBtn.style.color === 'red') {
                    Song.randomActive();
                } else {
                    Song.AutoPlay();
                }
            }
        }
    },
    seekSong: function() {
        timeTool.onchange = function() {
            audio.currentTime = (timeTool.value / 100) * audio.duration;
            audio.play();
            audio.onplay = function() {
                playBtnClasses.add('play');
                pauseBtnClasses.remove('pause');
            };
        }
    },
    songOnClick: function(id) {
        this.currentSongIndex = id < 0 ? 0 : id - 1;
        this.getCurrentSong();
        this.renderCurrentSong();
        this.renderCurrentSongHandle();
        audio.onplay = function() {
            playBtnClasses.add('play');
            pauseBtnClasses.remove('pause');
        };
        audio.play();
    },
    randomSongBtnColor: function() {
        let countClickTime = 0;
        randomBtn.onclick = function() {
            if (countClickTime === 0) {
                randomBtn.style.color = 'red';
                countClickTime++;
            } else if (countClickTime === 1) {
                randomBtn.style.color = 'white';
                countClickTime = 0;
            }
        }
    },
    loopSongBtnColor: function() {
        let countClickTime = 0;
        loopBtn.onclick = function() {
            if (countClickTime === 0) {
                loopBtn.style.color = 'red';
                audio.loop = true;
                countClickTime++;
            } else if (countClickTime === 1) {
                loopBtn.style.color = 'white';
                audio.loop = false;
                countClickTime = 0;
            }
        }
    },
    randomActive: function() {
        let countNum = Math.floor(Math.random() * 10);
        this.currentSongIndex = countNum;
        this.getCurrentSong();
        this.renderCurrentSong();
        this.renderCurrentSongHandle();
        audio.onplay = function() {
            playBtnClasses.add('play');
            pauseBtnClasses.remove('pause');
        };
        audio.play();
    },
    AutoPlay: function() {
        this.currentSongIndex < Song.song.length - 1 ? this.currentSongIndex++ : this.currentSongIndex = 0;
        this.getCurrentSong();
        this.renderCurrentSong();
        this.renderCurrentSongHandle();
        audio.onplay = function() {
            playBtnClasses.add('play');
            pauseBtnClasses.remove('pause');
        };
        audio.play();
    },
    start: function() {
        this.render();
        this.Scroll();
        this.renderCurrentSongHandle();
        this.renderCurrentSong();
        this.NextPrevBtn();
        this.CDHandle();
        this.audioHandle();
        this.seekSong();
        this.randomSongBtnColor();
        this.loopSongBtnColor();
    }
}
Song.start();