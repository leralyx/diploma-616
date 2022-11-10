let bek = 'https://lit-plains-46247.herokuapp.com/users'
let playlist = 'https://lit-plains-46247.herokuapp.com/playlist'
let db = []
let db_playlist = []
let all_like = []
let random_arr = []
let random = []
let select_track = Object

// Find elements
let footer = document.querySelector('footer')
let main = document.querySelector('main')
let search_side = document.querySelector('.search_and_music')
let aside = document.querySelector('aside')
let random_songs = document.querySelector('.random_songs')
let like_song = document.querySelector('.liked_tracks')
let playlist_list = document.querySelector(".playlist.tracks")
let modal_ = document.querySelector('.modals')
let name_user = document.querySelector('.name_user')

let is_premium = false
let name_person = 'No one'
let isPremium;

axios.get(bek)
    .then(res => {
        if (res.status == 200 || res.status == 201) {
            db = res.data.data
            loadMusic(db)
        }
    })
    .catch(err => console.log(err))

axios.get(playlist)
    .then(res => {
        create(res.data.data)
        db_playlist = res.data.data
    })
    .catch(err => console.log(err))


aside.innerHTML = `
        <div class="logo">
        <img src="../uplaod/logo.svg">
        </div>
        <div class="navigation">
        <span>NAVIGATION</span>
        <ul class="navige">
            <li>Homepage</li>
            <li>Playlist</li>
            <li>Settings</li>
        </ul>
        </div>
        <div class="playlists">
        <span>PLAYISTS</span>
        <ul>
            <li></li>
        </ul>
        </div>
        <div class="liked-songs">
        <span>LIKED SONGS</span>
        <ul>
            <li>
                <div class="song_name ">
                    <span>DJAJA</span>
                </div>
                <div class="song_duration">
                    <span>3:11</span>
                </div>
            </li>
        
        </ul>
        </div>
        `

if (!localStorage.isPremium || localStorage.isPremium == 'undefined') {
    localStorage.isPremium = fals
} else {
    isPremium = JSON.parse(localStorage.isPremium)
}
if (!localStorage.name) localStorage.name = "Alex"
else name_person = localStorage.name
let navige = document.querySelector('.navige').children

navige[2].onclick = () => window.location.href = '../pages/setting.html'
navige[1].onclick = () => window.location.href = '../pages/playlist.html'
navige[0].onclick = () => window.location.href = '../pages/homepage.html'


let div = document.createElement('div')
div.style.display = 'none'

let data = db
function loadMusic(arr) {
    let count = 0
    for (let item of arr) {
        // READ MUSIC INFO
        let audio = document.createElement('audio')

        audio.setAttribute('src', '../audio/' + item.org_name + '.mp3')
        audio.controls = true

        div.innerHTML = ''
        div.append(audio)
        document.body.prepend(div)

        audio.addEventListener("loadeddata", function () {
            item.duration = audio.duration
            item.length = audio.duration
            item.duration = item.duration / 60
            item.duration = Math.ceil((item.duration) * 100) / 100
            let last = item.duration.toString().slice(3, 4)
            let num = item.duration.toString().slice(2, 3)
            let start = item.duration.toString().slice(0, 1)
            if (item.duration.toString().length <= 3) {
                item.duration = (start + '.0' + num)
            }
            if (num >= 6) {
                // console.log(num,'mid');
                if (last == '') {
                } else {
                    start = +start++
                    item.duration = `${start}.${num + last - 60}`
                }
                // console.log(num+last)
            } else {
                item.duration = item.duration.toString().replace('.', ':')

            }
            if (item.duration.toString().length <= 3) {
                item.duration = (start + '.0' + num)
            }
            data.push(item)

            count += 1
            if (count == arr.length - 2) start_show(data)
        });
    }
}

function start_show(el) {
    songs(el)
}


function head(se) {
    search_side.innerHTML = `
                     <div class="input_account">
                         <div class="input">
                             <img src="../uplaod/search.svg">
                             <input type="text" class="search_" placeholder="Search by name or artist">
                         </div>
                         <div class="about_accout">
                             <span class="name_user">${name_person}</span>
                             <span class="version_account">${se}</span>
                         </div>
                     </div>
 `
}


if (isPremium) {
    main.style.background = ' linear-gradient(var(--premium_account_backgound_color), black)'
    let sa = 'Premium user'
    head(sa)

} else {
    main.style.background = ' linear-gradient(var(--normal_account_backgound_color), black)'
    let sa = 'Free user'
    head(sa)
}


modal_.innerHTML = `<p class="X">X</p>
<h1>Add to playlist</h1>
<div class="list">

</div>
<p class="create">Create new playlist</p>
<form name="create">
    <input type="text" name="name" placeholder="Name of playlst">
    <button>Save</button>
</form>`

let form = document.querySelector("form")


form.onsubmit = () => {
    event.preventDefault()
    let obj = {}
    let fm = new FormData(form)

    fm.forEach((val, key) => {
        obj[key] = val
    })

    axios.post(playlist, obj)
        .then(res => {
            db_playlist.push(res.data.data)
            create(db_playlist)
        })
        .catch(err => console.log(err))
}

footer.innerHTML = `
<footer>
<div class="the_week">
    <span class="week">The Weekend</span>
    <span class="nom">Starboy</span>
</div>
<div class="player">
    <div class="instrument">
        <img src="../uplaod/repeat.svg" class="repeat">
        <img src="../uplaod/track-next.svg" class="track-next">
        <img src="../uplaod/play.svg" class="play pause">
        <img src="../uplaod/track-prev.svg" class="track-prev">
        <img src="../uplaod/random.svg" class="randomimg">
    </div>
    <div class="time_and_other">
        <div class="dada_time">
            <div class="time"></div>
        </div>
    </div>
</div>
</footer>`



for (let i = 0; i < 10; i++) {
    let le = Math.random() * 47
    le = Math.ceil(le)
    random.push(le)
}

function songs(arr) {
    for (let item of arr) {
        for (let item2 of random) if (+item.key == item2) item.isRandom = true

        item.isRandom ? is_spawn(item, random_songs) : ''
        item.isLike ? is_spawn(item, like_song) : ''
    }
}

function is_spawn(item, param) {
    let itemm = document.createElement('div')
    let naming = document.createElement('div')
    let id = document.createElement('span')
    let name_of_song = document.createElement('span')
    let name = document.createElement('span')
    let love_ = document.createElement('p')
    let face = document.createElement('img')
    let duration = document.createElement('span')
    let add_ = document.createElement('img')
    let span_love_ = document.createElement('span')
    let span_add_ = document.createElement('span')

    // class
    itemm.classList.add('item')
    id.classList.add('id')
    naming.classList.add('namimg')
    name_of_song.classList.add('name_of_song')
    name.classList.add('name')
    love_.classList.add('love_')
    add_.classList.add('add_')
    duration.classList.add('duration')
    itemm.id = item._id

    let modals = document.querySelector('.modals')
    let closes = document.querySelector('.X')

    love_.onclick = () => {
        update_track(item)
    }

    add_.onclick = () => {
        modals.classList.add('active')
        select_track = item._id
    }

    closes.onclick = () => {
        modals.classList.remove('active')
    }

    id.innerHTML = '1'

    face.src = `../uplaod/${item.face}`
    name_of_song.innerHTML = item.name_of_song
    name.innerHTML = item.name
    love_.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16.702" height="14.567" viewBox="0 0 16.702 14.567"><path id="Icon_feather-heart" data-name="Icon feather-heart" d="M17.737,5.785a4.395,4.395,0,0,0-6.216,0l-.847.847-.847-.847A4.4,4.4,0,1,0,3.611,12l.847.847,6.216,6.216,6.216-6.216L17.737,12a4.395,4.395,0,0,0,0-6.216Z" transform="translate(-2.323 -4.497)" fill="#fff"/></svg>
                `
    duration.innerHTML = item.duration
    add_.src = `../uplaod/add.png`

    itemm.append(id, face, naming, span_love_, duration, span_add_)
    naming.append(name_of_song, name)
    span_love_.append(love_)
    span_add_.append(add_)
    param.append(itemm)

    itemm.onclick = () => {
        start_play(item)
    }
}

const update_track = (param) => {
    param.isLike = !param.isLike

    axios.patch(`${bek}/${param._id}`, param)
        .then(res => {
            like_song.innerHTML = ''
            for (let item of db) {
                param._id == item._id ? item = param : ''
                item.isLike ? is_spawn(item, like_song) : ''
            }
        })
        .catch(err => console.log(err))
}

const create = (arr) => {
    let list = document.querySelector('.list')
    list.innerHTML = ''
    for (let item of arr) {
        let div = document.createElement('div')

        div.classList.add('item')
        div.innerHTML = `<div class="name">${item.name}</div><div class="num_of_song">${item.arr.length}</div>`
        div.onclick = () => {
            let arr_2 = item.arr
            arr_2.push(select_track)

            let uniqueArray = arr_2.filter(function (elem, pos) {
                return arr_2.indexOf(elem) == pos;
            })

            let obj = {
                name: item.name,
                arr: uniqueArray
            }

            axios.patch(`${playlist}/${item._id}`, obj)
                .then(res => {
                    console.log("успешно добавлено")
                    create(db_playlist)
                })
                .catch(err => console.log("не добавлено"))
        }
        list.append(div)
    }
}

let play = document.querySelector('.play')
const start_play = (param) => {
    play.src = '../uplaod/pause.svg'
    listen(param)
}
let track_now = document.createElement('audio')

track_now.controls = true
track_now.style.display = 'none'
document.body.prepend(track_now)

let count_prog = 0
function listen(params, start) {
    track_now.src = `../audio/${params.org_name}.mp3`

    track_now.play()

    document.querySelector(".week").innerHTML = params.name
    document.querySelector(".nom").innerHTML = params.name_of_song
    let duration_ = params.length
    let time = document.querySelector('.time')

    let int = setInterval(() => {
        count_prog = count_prog + 1
        if (count_prog >= duration_) {
            next_play()
            clearInterval(int)
            time.style.width = `${count_prog}%`
            count_prog = 0
        } else {
            time.style.width = `${count_prog}%`
        }
    }, 1000)
    if (start == 0) {
        console.log("clear");
        clearInterval(int)
    }


    track_now.id = params._id
}
play.onclick = () => start_play()

let pause = document.querySelector('.pause')
const pause_play = () => {
    track_now.pause()
    play.src = '../uplaod/play.svg'
    for (let item of db) {
        let idx = track_now.id
        if(item._id == idx) {
            console.log(123);
            listen(item, 0)
        }
    }

}
pause.onclick = () => pause_play()

let next = document.querySelector('.track-next')
const next_play = () => {
    let idx = track_now.id
    for (let item of db) {
        if (item.id == idx) {
            let num_arr = db.indexOf(item)
            if (num_arr == db.length) num_arr = 0

            listen(db[num_arr + 1])
        }
    }
}
next.onclick = () => next_play()

let prev = document.querySelector('.track-prev')
const prev_play = () => {
    let idx = track_now.id
    for (let item of db) {
        if (item.id == idx) {
            let num_arr = db.indexOf(item)
            if (num_arr <= 0) num_arr = db.length
            listen(db[num_arr - 1])

        }
    }
}
prev.onclick = () => prev_play()
