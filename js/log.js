let $ = document
let logPassword = $.querySelector('#passwordLog')
let logEmail = $.querySelector('#emailLog')
let hideShow = $.querySelector('#showHide')
let loginBtn = $.querySelector('.btn-log')

let nowClient = []
let allUser = JSON.parse(localStorage.getItem('user')) || []
let showFlag = true
let admin;



function showHandler() {
    if (showFlag) {
        hideShow.style.textDecoration = 'line-through'
        showFlag = false
        logPassword.type = 'text'
    } else {
        hideShow.style.textDecoration = 'none'
        showFlag = true
        logPassword.type = 'password'
    }
}


function btnLogHandler() {
    let someUser = allUser.some(function(user) {
        if (user.Password == logPassword.value || user.Email == logEmail.value) {
            admin = user
            return true
        }
    })
    if (someUser) {
        nowClient = []
        nowClient.push(admin)
        localStorage.setItem('admin', JSON.stringify(nowClient))
        loginBtn.setAttribute('href', 'dashboard.html')





    } else {
        loginBtn.removeAttribute('href')
        Swal.fire({
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            title: 'email or username has wrong',
            icon: 'error',
        })
    }
}






loginBtn.addEventListener('click', btnLogHandler)
hideShow.addEventListener('click', showHandler)