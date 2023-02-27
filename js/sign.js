let $ = document
let signName = $.querySelector('#signUsername')
let lastNameSign = $.querySelector('#signLastName')
let signPassword = $.querySelector('#passwordSign')
let signEmail = $.querySelector('#emailSign')
let hideShow = $.getElementById('showHide')

//error element
let emailError = $.getElementById('email-error')
let nameError = $.getElementById('name-error')
let lastError = $.getElementById('last-error')
let passError = $.getElementById('pass-error')

//submit btn
let signUpBtn = $.querySelector('.btn-submit')

//flag
let nameValid, lastValid, passwordValid, emailValid = null
let showFlag = true

//user local storage
let nowClient = []
let allUser = JSON.parse(localStorage.getItem('user')) || []



//



//validation form
function nameHandler() {
    if (signName.value.length < 3) {
        nameError.style.display = 'block'
        nameValid = false
    } else {
        nameError.style.display = 'none'
        nameValid = true
    }
}


function passwordHandler() {
    if (signPassword.value.length < 6) {
        passError.style.display = 'block'
        passValid = false
    } else {
        passError.style.display = 'none'
        passValid = true
    }
}

function emailHandler() {
    if (signEmail.value.length < 5) {
        emailError.style.display = 'block'
        emailValid = false
    } else {
        emailError.style.display = 'none'
        emailValid = true
    }
}

function lastHandler() {
    if (lastNameSign.value.length < 3) {
        lastError.style.display = 'block'
        lastValid = false
    } else {
        lastError.style.display = 'none'
        lastValid = true
    }
}



//show and hide password

function showHandler() {
    if (showFlag) {
        hideShow.style.textDecoration = 'line-through'
        showFlag = false
        signPassword.type = 'text'
    } else {
        hideShow.style.textDecoration = 'none'
        showFlag = true
        signPassword.type = 'password'
    }
}


//submit and enter the panel
function btnHandler() {
    if (lastValid, nameValid, passwordValid, emailValid) {

        let someUser = allUser.some(function(user) {
            if (user.Password == signPassword.value || user.Email == signEmail.value) {
                return true
            }
        })
        if (someUser) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                title: 'this account already exist',
                icon: 'error',
            })

        } else {
            let newUser = { id: allUser.length + 1, Name: signName.value, Last: lastNameSign.value, Email: signEmail.value, Password: signPassword.value, backgroundImg: 'img/image.jpg', profileImg: 'img/images (1).jpg' }
            allUser.push(newUser)

            localStorage.setItem('user', JSON.stringify(allUser))
            signUpBtn.setAttribute('href', 'login.html')

            signEmail.value = ''
            signPassword.value = ''
            lastNameSign.value = ''
            signName.value = ''
        }


    } else {
        Swal.fire({
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            title: 'these information is not valid please check again',
            icon: 'error',
        })

        signUpBtn.removeAttribute('href')
    }
}





hideShow.addEventListener('click', showHandler)
signName.addEventListener('keydown', nameHandler)
lastNameSign.addEventListener('keydown', lastHandler)
signPassword.addEventListener('keydown', passwordHandler)
signEmail.addEventListener('keydown', emailHandler)
signUpBtn.addEventListener('click', btnHandler)