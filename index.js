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
let shows = false;

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
        shows = !shows;
        if (shows) {
            console.log(shows);
            let descr = document.createElement('p')
            descr.className = "description"
            descr.innerText = food.description
            
            let price = document.createElement('p')
            price.className = "price"
            price.innerText = `Price: $${food.price}`
            
            let foodReviewBtn = document.createElement('button')
            foodReviewBtn.className = "foodReviewBtn"
            foodReviewBtn.innerText = "Review"
            foodReviewBtn.addEventListener('click', e => {
                e.preventDefault()

                let foodReviewForm = document.createElement('form')
                foodReviewForm.className = "foodReviewForm"

                let formInput = document.createElement('input')
                formInput.type = 'text'
                formInput.name = 'foodReview'
                formInput.placeholder = 'Type your review here'
                foodReviewForm.append(formInput)
                foodUl.append(foodReviewForm)
                
                let submitReviewBtn = document.createElement('input')
                submitReviewBtn.type = "submit"
                submitReviewBtn.className = "submitReviewButton"
                foodReviewForm.append(submitReviewBtn)

                foodReviewForm.addEventListener('submit', (e) => {
                    e.preventDefault()
                    let newReview = e.target.foodReview.value
                    fetch(`http://localhost:3000/Foods/${Foods.id}`, {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json"
                    },
                        body: JSON.stringify({newReview})
                            
                        .then((r) => r.json())
                        .then(foodObj => {
                            console.log(foodObj.review)

                        })
                    })
               // fetch(`http://localhost:3000/Foods/${food.id}`, {
              //      method: "POST",
               //     headers: {
                //        "Content-Type": "application/json"
                 //   },
                  //  body: JSON.stringify(reviews.push())
               // })
                })

            let likeBtn = document.createElement('button')
            likeBtn.className = "likeBtn"
            likeBtn.innerText = "Like"
            
            foodUl.append(descr, price, likeBtn, foodReviewBtn)
            foodLi.append(foodUl)
            
            foodUl.style.display = "block";
        } else {
            foodUl.innerText = ''
            foodUl.style.display = "none";
        }
    )}
    })}