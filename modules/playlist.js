// let playlist_api = 'https://lit-plains-46247.herokuapp.com/playlist'

axios.get(playlist)
.then(res => {
    for (let item of res.data.data) {
        
        is_spawn(item)
        }
    })
    .catch(err => console.log(err))


function is_spawn(item) {
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
    document.querySelector(".playlist_tracks").append(itemm)
}