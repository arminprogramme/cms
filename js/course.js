let courseContainer = $.querySelector('.course-container');
let btnAdd = $.querySelector('#add-course')
let allCourse = JSON.parse(localStorage.getItem('course')) || []



allCourse.forEach(function(course) {

    let parentElement = $.createElement('div')
    parentElement.className = 'card mb-3'


    let parentElement2 = $.createElement('div')
    parentElement2.className = 'row g-10'

    let imgDiv = $.createElement('div')
    imgDiv.className = 'col-md-3'

    let imgElement = $.createElement('img')
    imgElement.src = 'img/images.jpg'
    imgElement.className = 'img-fluid rounded-start'

    let detailElement = $.createElement('div')
    detailElement.className = 'col-md-9'


    let cardElement = $.createElement('div')
    cardElement.className = 'card-body'

    let subCard = $.createElement('h5')
    subCard.className = 'card-title'
    subCard.innerHTML = course.Name

    let txtCard = $.createElement('p')
    txtCard.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione alias magnam accusantium ea placeat odio, deserunt doloribus reiciendis corporis possimus harum temporibus, maiores, quibusdam provident inventore natus minus atque amet!'
    txtCard.className = 'card-text'

    let endParentElement = $.createElement('div')
    endParentElement.className = 'card-body d-flex justify-content-between align-items-center'

    let categoryDiv = $.createElement('div')
    categoryDiv.className = 'category'
    categoryDiv.innerHTML = course.Category


    let btnDiv = $.createElement('div')
    btnDiv.className = 'price-btn d-flex align-items-center'

    let btnEdit = $.createElement('button')
    btnEdit.className = 'btn btn-primary mx-1 btn-edit'
    btnEdit.innerHTML = 'Edit'


    let btnRemove = $.createElement('button')
    btnRemove.className = 'btn btn-secondary btn-remove'
    btnRemove.innerHTML = 'Remove'




    //events of button


    btnEdit.addEventListener('click', function(event) {
        editCourse(course.Name, course.Category, event, categoryDiv, subCard)
    })
    btnRemove.addEventListener('click', function(event) {
        removeCourse(course.Name, course.Category, event)
    })










    //appending
    btnDiv.append(btnEdit, btnRemove)
    endParentElement.append(categoryDiv, btnDiv)
    cardElement.append(subCard, txtCard, endParentElement)
    detailElement.append(cardElement)
    imgDiv.append(imgElement)
    parentElement2.append(imgDiv, detailElement)
    parentElement.append(parentElement2)
    courseContainer.append(parentElement)

})









function addHandler(event) {
    Swal.fire({
        title: 'Create Your Course',
        html: '<input class="form-control my-3" placeholder="title Course" id="name-course"><input class="form-control" placeholder="Major Course" id="category-course">'
    }).then((result) => {

        if (result.isConfirmed) {
            let inputAlert = $.querySelector('#name-course')
            let categoryName = $.querySelector('#category-course')
            if (inputAlert.value.trim() !== '' && categoryName.value.trim() !== '') {







                let parentElement = $.createElement('div')
                parentElement.className = 'card mb-3'


                let parentElement2 = $.createElement('div')
                parentElement2.className = 'row g-10'

                let imgDiv = $.createElement('div')
                imgDiv.className = 'col-md-3'

                let imgElement = $.createElement('img')
                imgElement.src = 'img/images.jpg'
                imgElement.className = 'img-fluid rounded-start'

                let detailElement = $.createElement('div')
                detailElement.className = 'col-md-9'


                let cardElement = $.createElement('div')
                cardElement.className = 'card-body'

                let subCard = $.createElement('h5')
                subCard.className = 'card-title'
                subCard.innerHTML = inputAlert.value

                let txtCard = $.createElement('p')
                txtCard.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione alias magnam accusantium ea placeat odio, deserunt doloribus reiciendis corporis possimus harum temporibus, maiores, quibusdam provident inventore natus minus atque amet!'
                txtCard.className = 'card-text'

                let endParentElement = $.createElement('div')
                endParentElement.className = 'card-body d-flex justify-content-between align-items-center'

                let categoryDiv = $.createElement('div')
                categoryDiv.className = 'category'
                categoryDiv.innerHTML = categoryName.value


                let btnDiv = $.createElement('div')
                btnDiv.className = 'price-btn d-flex align-items-center'

                let btnEdit = $.createElement('button')
                btnEdit.className = 'btn btn-primary mx-1 btn-edit'
                btnEdit.innerHTML = 'Edit'


                let btnRemove = $.createElement('button')
                btnRemove.className = 'btn btn-secondary btn-remove'
                btnRemove.innerHTML = 'Remove'

                //events of btn

                btnEdit.addEventListener('click', function(event) {
                    editCourse(inputAlert.value, categoryName.value, event, categoryDiv, subCard)
                })
                btnRemove.addEventListener('click', function(event) {
                    removeCourse(inputAlert.value, categoryName.value, event)
                })





                //appending
                btnDiv.append(btnEdit, btnRemove)
                endParentElement.append(categoryDiv, btnDiv)
                cardElement.append(subCard, txtCard, endParentElement)
                console.log(endParentElement);
                console.log(cardElement)
                detailElement.append(cardElement)
                imgDiv.append(imgElement)
                parentElement2.append(imgDiv, detailElement)
                parentElement.append(parentElement2)
                courseContainer.append(parentElement)

                let newCourse = { id: allCourse.length + 1, Name: inputAlert.value, Category: categoryName.value }
                allCourse.push(newCourse)
                localStorage.setItem('course', JSON.stringify(allCourse))

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Please fill out the inputs'
                })
            }
        }
    })
}




function removeCourse(name, category, event) {
    let courseItem = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    courseItem.remove()


    let someCourse = allCourse.some(function(item) {
        if (item.Name === name) {
            return true
        }
    })
    if (someCourse) {

        let courseFinder = allCourse.findIndex(function(item) {
            return item.Name === name
        })

        allCourse.splice(courseFinder, 1)
        localStorage.setItem('course', JSON.stringify(allCourse))

    }


}

function editCourse(name, category, catDiv, subDiv) {
    Swal.fire({
        icon: false,
        title: 'Edit Your Name of Your Course',
        denyButtonText: `Don't save`,
        showDenyButton: true,
        html: '<input type="text" id="edit-name" placeholder="Name course" class="form-control my-2" /> <input type="text" placeholder="category course" id="edit-category" class="form-control" />'
    }).then((result) => {

        if (result.isConfirmed) {
            let nameSweet = $.querySelector('#edit-name')
            let categorySweet = $.querySelector('#edit-category')
            if (nameSweet.value.trim() !== '' || categorySweet.value.trim() !== '') {
                let findCourseName = allCourse.find(function(item) {
                    return item.Name === name

                })
                let findCourseCategory = allCourse.find(function(item) {
                    return item.Category === category

                })

                window.history.go()
                findCourseName.Name = nameSweet.value
                findCourseCategory.Category = categorySweet.value
                localStorage.setItem('course', JSON.stringify(allCourse))
                subDiv.innerHTML = name
                catDiv.innerHTML = category
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
        }
    })
}









btnAdd.addEventListener('click', addHandler);