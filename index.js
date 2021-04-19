let menu = document.querySelector('.menu')
let title = document.querySelector('.title')
let centerImg = document.querySelector('.centerimage')

fetch('http://localhost:3000/Foods')
.then(res => res.json())
.then(menuArr => {
    menuArr.forEach(menuObj => {
        getFood(menuObj)
    })
})

//help function to create list of food
let shows = 0;

function getFood(food) {
    
    let foodLi = document.createElement('ul')
    foodLi.className = "foodList"
    
    let title = document.createElement('h2')
    title.className = "title"
    title.innerText = food.name

    let img = document.createElement('img')
    img.className = "foodImage"
    img.src = food.image

    let foodUl = document.createElement('ul')

    foodLi.append(title, img)
    menu.append(foodLi)
    
    img.addEventListener('click', e => {
            console.log(shows);
            let descr = document.createElement('p')
            descr.className = "description"
            descr.innerText = food.description
    
            let price = document.createElement('li')
            price.className = "price"
            price.innerText = `Price: $${food.price}`
    
            foodUl.append(descr, price)
            foodLi.append(foodUl)

            foodUl.style.display = "block"
        }
    )
}