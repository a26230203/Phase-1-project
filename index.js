let menu = document.querySelector('.menu')
let title = document.querySelector('.title')
let centerImg = document.querySelector('.centerimage')
let restaurantReview = document.querySelector('.restaurant-review')
let customerReview = document.querySelector('.customerreview')


fetch('http://localhost:3000/Foods')
.then(res => res.json())
.then(menuArr => {
    menuArr.forEach(menuObj => {
        getFood(menuObj)
    })
})




//help function to create list of food
let shows = false;
let counter = 0;

console.log(counter)

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
        let descr = document.createElement('p')
        descr.className = "description"
        descr.innerText = food.description
                    
        let price = document.createElement('p')
        price.className = "price"
        price.innerText = `Price: $${food.price}`
                    
        let foodReviewBtn = document.createElement('button')
        foodReviewBtn.className = "foodReviewBtn"
        foodReviewBtn.innerText = "Review"

        let likes =document.createElement('p')
        likes.className = "Like"
        likes.innerText = `${food.likes} People Like this item`

        let likeBtn = document.createElement('button')
        likeBtn.className = "likeBtn"
        likeBtn.innerText = "Like"

         
        foodUl.append(descr, price, likeBtn, likes, foodReviewBtn)

        foodLi.append(foodUl)
          
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

              //Post customer food review 
            /*  foodReviewForm.addEventListener("submit", e => {
                  e.preventDefault()
                  let arrOfReview = food.review
                  let newReview = e.target.foodReview.value
               fetch(`http://localhost:3000/Foods/${food.id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            review: arrOfReview.push(newReview)
                        })
                })
                .then(res => res.json())
              })*/
        })

            //Like button evenListener
            likeBtn.addEventListener('click', e => {
                
                if(counter == 0 && likeBtn.innerText == "Like") {
                    fetch(`http://localhost:3000/Foods/${food.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                likes: food.likes = food.likes + 1
                        })
                    })
                    .then(res => res.json())
                    .then(updatedLike => {
                        likes.innerText = `${updatedLike.likes} People Like this item`
                        food.likes = updatedLike.likes
                        counter++;
                        likeBtn.innerText = "Unlike"
                    })
                }else if (counter >= 0 && likeBtn.innerText == "Unlike") {
                    fetch(`http://localhost:3000/Foods/${food.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                likes: food.likes = food.likes - 1
                        })
                    })
                    .then(res => res.json())
                    .then(updatedLike => {
                        likes.innerText = `${updatedLike.likes} People Like this item`
                        food.likes = updatedLike.likes
                        counter--;
                        likeBtn.innerText = "Like"
                    })
                }
            })

         foodUl.style.display = "block";

         }else{
           foodUl.innerText = ''
           foodUl.style.display = "none"; 
         }  
    })
}

fetch('http://localhost:3000/reviews')
.then(res => res.json())
.then(reviewObj => {
    reviewObj.forEach(review => {
        overallReview(review)
    })
})

restaurantReview.addEventListener("submit", e => {
    e.preventDefault()
    let newReview = e.target.review.value
    fetch('http://localhost:3000/reviews', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            review: newReview
        }),
    })
    .then(res => res.json())
    .then(updatedReview => {
        overallReview(updatedReview)
    
    })

})

//help function for customer review
editorShow = false;

function overallReview(review) {
    let newP = document.createElement('p')
    newP.className = "reviewP"
    newP.innerText = review.review

    let delBtn = document.createElement('button')
    delBtn.className = "delete"
    delBtn.innerText = "Delete"

    let editor = document.createElement('button')
    editor.className = "editor"
    editor.innerText = "Edit"

    let editForm = document.createElement('form')
    editForm.className = "editForm"
    let editInput = document.createElement('input')
    editInput.type = "text"
    editInput.className = "editInput"
    editInput.id = "input"
    let editorSub = document.createElement('button')
    editorSub.innerText = "Update"

    customerReview.append(newP, editor, delBtn) 

    delBtn.addEventListener('click', e => {
        fetch(`http://localhost:3000/reviews/${review.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(deleteP => {
            newP.remove()
            delBtn.remove()
            editor.remove()
            editInput.remove()
            editorSub.remove()
        })
    })

    editor.addEventListener('click', e => {
        editorShow = !editorShow

        if(editorShow) {
            editForm.append(editInput)
            customerReview.append(editForm)
            editForm.append(editorSub)

            editInput.style.display = 'block'
            editorSub.style.display = 'block'

            editForm.addEventListener("submit", e => {
                e.preventDefault()
                let newInput = e.target.input.value
               fetch(`http://localhost:3000/reviews/${review.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    review: newInput
                }),
                })
                .then(res => res.json())
                .then(updatedReview => {
                    newP.innerText = updatedReview.review
                    review.review = updatedReview.review
                })
            })

        }else {

            editInput.style.display = 'none'
            editorSub.style.display = 'none'
        }
    })

}