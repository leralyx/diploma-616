let seting = document.forms.seting
let name_user = document.querySelector('.name_user')
let black_ball = document.querySelector('.black_ball')
let button_change = document.querySelector('.button_change')
let main = document.querySelector('main')
let isPremium = false || JSON.parse(localStorage.isPremium)

seting.onsubmit = (e) => {
    e.preventDefault()

    let name_of_setting = {}

    let fm = new FormData(seting)

    fm.forEach((value, key) => {
        name_of_setting[key] = value
    })

    localStorage.name = name_of_setting.name
    name_user.innerHTML = localStorage.getItem('name')
}


black_ball.onclick = () => {
    isPremium = !isPremium
    localStorage.isPremium = isPremium
    
    check_changer()
}

let header_name = document.querySelector('.version_account')
const check_changer = () => {
    if (isPremium) {
        header_name.innerHTML = "Premiuim user"
        main.style.background = ' linear-gradient(var(--premium_account_backgound_color), black)'
        button_change.style.justifyContent = 'end'
    } else {
        header_name.innerHTML = "Free user"
        button_change.style.justifyContent = 'start'
        main.style.background = ' linear-gradient(var(--normal_account_backgound_color), black)'
    }
}
check_changer()