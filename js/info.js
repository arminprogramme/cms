let buttonWrapper = $.querySelector('.buttonWrapper')
let tabButtons = $.querySelectorAll('.tab-button')
let contents = $.querySelectorAll('.content')
let inputName = $.querySelector('#pro-name')
let inputLast = $.querySelector('#pro-last')
let inputEmail = $.querySelector('#pro-email')
let inputOldPass = $.querySelector('#pro-old-password')
let inputNewPass = $.querySelector('#pro-new-password')

let headerName = $.querySelector('#name-profile')


//img changer
let imgBackground1 = $.querySelector('#background-img-1')
let imgProfile1 = $.querySelector('#profile-img-1')
let imgBackground2 = $.querySelector('#background-img-2')
let imgProfile2 = $.querySelector('#profile-img-2')

let inputChanger1 = $.querySelector('#input-img-1')
let inputChanger2 = $.querySelector('#input-img-2')


//errors
let nameError = $.querySelector('#name-error')
let lastError = $.querySelector('#last-error')
let passError1 = $.querySelector('#pass-error1')
let passError2 = $.querySelector('#pass-error2')
let emailError = $.querySelector('#email-error')

//flags
let nameValid, lastValid, passwordValid, emailValid, matchPassword = null
let btn = $.querySelector('#submit')

let nowClient = JSON.parse(localStorage.getItem('admin')) || []
    //




//recheck the info
nowClient.forEach(function(info) {
    inputName.value = info.Name
    inputLast.value = info.Last
    inputEmail.value = info.Email
    headerName.innerHTML = info.Name + ' ' + info.Last
    inputOldPass.value = info.Password
    inputNewPass.value = info.Password
    imgBackground1.src = info.backgroundImg
    imgBackground2.src = info.backgroundImg
    imgProfile1.src = info.profileImg
    imgProfile2.src = info.profileImg
})



//change info
function nameHandler() {
    if (inputName.value.length < 3) {
        nameError.style.display = 'block'
        nameValid = false
    } else {
        nameError.style.display = 'none'
        nameValid = true
    }
}

function lastHandler() {
    if (inputLast.value.length < 3) {
        lastError.style.display = 'block'
        lastValid = false
    } else {
        lastError.style.display = 'none'
        lastValid = true
    }
}


function oldHandler() {
    if (inputOldPass.value.length < 6) {
        passError1.style.display = 'block'
        passValid = false
    } else {
        passError1.style.display = 'none'
        passValid = true
    }
}

function newHandler() {
    if (inputOldPass.value.length < 6) {
        passError2.style.display = 'block'
        passValid = false
    } else if (inputOldPass.value.length > 6) {
        passError2.style.display = 'none'
        passValid = true
    }

}


function changeHandler() {
    if (inputNewPass.value !== inputOldPass.value) {
        matchPassword = false;
        Swal.fire({
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            title: 'Passwords did`nt Match',
            icon: 'error',
        })
    } else {
        matchPassword = true;
    }


    if (nameValid, lastValid, passwordValid, emailValid, matchPassword) {
        nowClient = []
        let newUser = { id: nowClient.length + 1, Name: inputName.value, Last: inputLast.value, Email: inputEmail.value, Password: inputNewPass.value }
        nowClient.push(newUser)
        localStorage.setItem('admin', JSON.stringify(nowClient))
        window.history.go(0)
    }
}



//change tab
buttonWrapper.addEventListener('click', event => {

    let mainContentID = event.target.dataset.id
    let mainContent = $.querySelector(`#${mainContentID}`)

    tabButtons.forEach(btn => btn.classList.remove('active'))
    event.target.classList.add('active')

    contents.forEach(content => content.classList.remove('active'))
    mainContent.classList.add('active')
})



function change1Handler(event) {
    let input = event.target;

    let reader = new FileReader();
    reader.onload = function() {
        let dataURL = reader.result;
        imgBackground1.src = dataURL
        imgBackground2.src = dataURL;


        nowClient.forEach(function(info) {
            info.backgroundImg = dataURL
        })
        localStorage.setItem('admin', JSON.stringify(nowClient))
    };
    reader.readAsDataURL(input.files[0]);



}

function change2Handler(event) {
    let input = event.target;

    let reader = new FileReader();
    reader.onload = function() {
        let dataURL = reader.result;
        imgProfile1.src = dataURL
        imgProfile2.src = dataURL;
        nowClient.forEach(function(info) {
            info.profileImg = dataURL
        })
        localStorage.setItem('admin', JSON.stringify(nowClient))
    };
    reader.readAsDataURL(input.files[0]);

}






inputName.addEventListener('keydown', nameHandler)
inputLast.addEventListener('keydown', lastHandler)
inputOldPass.addEventListener('keydown', oldHandler)
inputNewPass.addEventListener('keydown', newHandler)
btn.addEventListener('click', changeHandler)
inputChanger1.addEventListener('click', change1Handler)
inputChanger2.addEventListener('click', change2Handler)








/* */