let usersContainer = $.querySelector('.user-container');
let allUser = JSON.parse(localStorage.getItem('user')) || []
let nowClient = JSON.parse(localStorage.getItem('admin')) || []
let fragment = $.createDocumentFragment()

allUser.forEach(function(user) {

    //parent element user
    let parentDiv = $.createElement('div')
    parentDiv.className = 'col-12 d-flex justify-content-between user align-items-center '

    //options
    let part1Div = $.createElement('div')
    part1Div.className = 'part-1 d-flex align-items-center'

    //img
    let imgUSer = $.createElement('img')
    imgUSer.src = user.profileImg
    console.log(user.profileImg);

    //name
    let titleUser = $.createElement('h5')
    titleUser.className = 'fw-bold'
    titleUser.id = user.id
    titleUser.innerHTML = user.Name

    //btn Part
    let btnDiv = $.createElement('div')
    btnDiv.className = 'btn-user part-2'


    //btn edit
    let btnEdit = $.createElement('button')
    btnEdit.className = 'btn btn-primary'
    btnEdit.id = 'edit-btn'
    btnEdit.innerHTML = 'Edit'

    //remove btn
    let btnRemove = $.createElement('button')
    btnRemove.className = 'btn btn-secondary'
    btnRemove.id = 'remove-btn'
    btnRemove.innerHTML = 'Remove'



    //remove event
    btnRemove.addEventListener('click', function(event) {
        removeHandler(user.Name, event.target)
    })


    //edit Event
    btnEdit.addEventListener('click', function(event) {
        editHandler(user.Name, event.target, titleUser)
    })



    //appending element
    part1Div.append(imgUSer, titleUser)
    btnDiv.append(btnEdit, btnRemove)
    parentDiv.append(part1Div, btnDiv)
    fragment.appendChild(parentDiv)

    usersContainer.append(fragment)
})



//remove handler
function removeHandler(userName, target) {
    let userRemove = target.parentElement.parentElement
    userRemove.remove()

    let someFinder = allUser.some(function(item) {
        if (item.Name === userName) {
            return true
        }
    })
    if (someFinder) {

        let userFinder = allUser.findIndex(function(user) {
            return user.Name === userName
        })

        allUser.splice(userFinder, 1)
        localStorage.setItem('user', JSON.stringify(allUser))

    }
}



//edit Handler
function editHandler(userName, target, titleName) {
    Swal.fire({
        icon: false,
        title: 'Edit Your Name of Your Client',
        denyButtonText: `Don't save`,
        showDenyButton: true,
        html: '<input type="text" id="edit-name" class="form-control" />',

    }).then((result) => {

        if (result.isConfirmed) {
            let inputAlert = $.querySelector('#edit-name')
            if (inputAlert.value.trim()) {
                let oldName = titleName.innerHTML
                let findUser = allUser.find(function(item) {
                    return item.Name === oldName

                })

                findUser.Name = inputAlert.value
                console.log(findUser);
                localStorage.setItem('user', JSON.stringify(allUser))
                titleName.innerHTML = inputAlert.value
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    timerProgressBar: true,
                    title: 'these inputs are`nt not valid please check again',
                    icon: 'error',
                })
            }

        } else {

        }
    })

}