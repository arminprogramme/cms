let chart1 = document.getElementById('myChart1');
let chart2 = document.getElementById('myChart2');
let inputTodo = document.getElementById('input-todo');
let todoDiv = document.querySelector('.all-todo')
let error = document.querySelector('#error-todo')
let allTodo = JSON.parse(localStorage.getItem('todo')) || []




allTodo.forEach(function(item) {


    let todoItems = document.createElement('div')
    todoItems.className = 'col-12 justify-content-between align-items-center d-flex todo-item'

    let todoTitle = document.createElement('h5')
    todoTitle.innerHTML = item.Name

    let optionTodo = document.createElement('div')
    optionTodo.className = 'options-todo-project d-flex justify-content-between'

    let checkInput = document.createElement('h6')
    checkInput.className = 'fw-bold px-3'
    checkInput.innerHTML = 'Done'


    let trashIcon = document.createElement('i')
    trashIcon.className = 'fa fa-trash'


    trashIcon.addEventListener('click', function(event) {
        trashHandler(item.Name, event)
    })
    checkInput.addEventListener('click', function(event) {
        checkHandler(item.Name, event)
    })

    optionTodo.append(checkInput, trashIcon)
    todoItems.append(todoTitle, optionTodo)
    todoDiv.append(todoItems)

})








function windowHandler(event) {

    if (event.key == 'Enter') {
        if (inputTodo.value.trim() !== '') {
            if (inputTodo.value.length < 12) {


                let todoName = inputTodo.value
                let todoItems = document.createElement('div')
                todoItems.className = 'col-12 justify-content-between align-items-center d-flex todo-item'

                let todoTitle = document.createElement('h5')
                todoTitle.innerHTML = todoName

                let optionTodo = document.createElement('div')
                optionTodo.className = 'options-todo-project d-flex justify-content-between'

                let checkInput = document.createElement('h6')
                checkInput.className = 'fw-bold px-3'
                checkInput.innerHTML = 'Done'


                let trashIcon = document.createElement('i')
                trashIcon.className = 'fa fa-trash'

                //events

                checkInput.addEventListener('click', function(event) {
                    checkHandler(todoName, event)
                })

                trashIcon.addEventListener('click', function(event) {
                    trashHandler(todoName, event)
                })



                //set local storage
                let newTodo = { id: allTodo.length + 1, Name: todoName, Status: 'not Finished' }
                allTodo.push(newTodo)

                localStorage.setItem('todo', JSON.stringify(allTodo))
                error.style.display = 'none'


                //appending
                optionTodo.append(checkInput, trashIcon)
                todoItems.append(todoTitle, optionTodo)
                todoDiv.append(todoItems)

                inputTodo.value = ''
            } else {
                error.style.display = 'block'
            }
        }

    }
}

function trashHandler(todoName, event) {
    let removeName = todoName
    let divRemove = event.target.parentElement.parentElement
    divRemove.remove()

    let someFinder = allTodo.some(function(item) {
        if (item.Name === removeName) {
            return true
        }
    })
    if (someFinder) {

        let todoFinder = allTodo.findIndex(function(todo) {
            return todo.Name === todoName
        })

        allTodo.splice(todoFinder, 1)
        localStorage.setItem('todo', JSON.stringify(allTodo))

    }
}


function checkHandler(todoName, event) {
    let someCheck = allTodo.find(function(item) {
        return item.Name === todoName
    })
    if (someCheck.Status == 'not Finished') {
        someCheck.Status = 'Finished'
        event.target.style.textDecoration = 'line-through'
        event.target.style.color = 'red'
    } else {
        someCheck.Status = 'not Finished'
        event.target.style.textDecoration = 'none'
        event.target.style.color = '#fff'
    }
}




window.addEventListener('keydown', windowHandler)






























//chars

let shapeChart1 = new Chart(chart1, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb ', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
                label: 'old Visitors',
                data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
                fill: true,
                borderColor: '#ffffff53',
                backgroundColor: '#ffffff43'
            },
            {
                label: 'old Visitors',
                data: [3, 4, 8, 5, 7, 4, 6, 6, 4, 3],
                fill: true,
                backgroundColor: '#ffffff'
            },
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                ticks: { color: '#fff', beginAtZero: true }
            },
            x: {
                ticks: { color: '#fff', beginAtZero: true }
            }
        }
    }
})



let shapeChart2 = new Chart(chart2, {
    type: 'doughnut',
    data: {
        labels: ['Jan', 'Feb ', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
                label: 'old Visitors',
                data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
                fill: true,
                borderColor: '#ffffff53',
                backgroundColor: '#ffffff43'
            }, {
                label: 'old Visitors',
                data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
                fill: true,
                borderColor: '#ffffff53',
                backgroundColor: '#ffffff'
            },

        ]
    },
    options: {
        legend: {
            fontColor: "white"
        },
        responsive: true,
        scales: {
            y: {
                ticks: { color: '#fff', }
            },
            x: {
                ticks: { color: '#fff', }
            }
        }
    }

})