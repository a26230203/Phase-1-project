let menu = document.querySelector('.menu')
let title = document.querySelector('.title')
let centerImg = document.querySelector('.centerimage')
let restaurantReview = document.querySelector('.restaurant-review')
let customerReview = document.querySelector('.customerreview')
let homeMenus = document.querySelector('#homeMenus')
let shows = false;
let counter = 0;
let reviewShows = false;
let foodReviewShows = false;
let homeMenusShows = false;
let contactShows = false;
let contactCounter = 0;
let homeMenusCounter = 0;
let contactHeader = document.querySelector('li#contact')
let contactInfoDiv = document.querySelector('section.contactInfo')
let reviewHeaderSec = document.querySelector('section.reviewHeader')
let contactUl = document.createElement('ul')
    contactUl.className = "contactUl"
let reviewH = document.createElement('h1')
    
        

restaurantReview.style.display = "none"
customerReview.style.display = "none"


homeMenus.addEventListener('click', e => {
    homeMenusShows = !homeMenusShows
    if(homeMenusShows && homeMenusCounter == 0){
        homeMenusCounter++

        reviewH.innerText = "Customer Reviews"
        reviewHeaderSec.append(reviewH)
        
    fetch('http://localhost:3000/Foods')
    .then(res => res.json())
    .then(menuArr => {
        menuArr.forEach(menuObj => {
            getFood(menuObj)        
        })
    })
    
//help function to create list of food    
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
    
    foodLi.append(img, title)
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
        likes.innerText = `${food.likes} People Like this item!`

        let likeBtn = document.createElement('button')
        likeBtn.className = "likeBtn"
        likeBtn.innerText = "Like"

        let line = document.createElement('hr')
        line.className = 'divider'

            
        foodUl.append(descr, price, line, likeBtn, likes, foodReviewBtn)

        foodLi.append(foodUl)
        
        let foodReviewForm = document.createElement('form')
        foodReviewForm.className = "foodReviewForm"       

        let formInput = document.createElement('input')
        formInput.className = 'formInput'
        formInput.type = 'text'
        formInput.name = 'foodReview'
        formInput.placeholder = 'Let us know what you thought of this item!'

        let submitReviewBtn = document.createElement('input')
        submitReviewBtn.type = "submit"
        submitReviewBtn.className = "submitReviewButton"
        
        let foodReviewUl = document.createElement('ul')
        foodReviewUl.className = "foodReviewUl"
        
    
        foodReviewBtn.addEventListener('click', e => {
        e.preventDefault()
        reviewShows = !reviewShows
        
        if (reviewShows) {
        foodReviewForm.append(formInput)
        foodUl.append(foodReviewForm)
        foodReviewForm.append(submitReviewBtn)

        foodReviewUl.innerText = ""
        food.review.forEach((reviewArr, index) => {
            let foodReviewUls = document.createElement('ul')
            foodReviewUls.className = "foodReviewUls"
            let newPs = document.createElement('p')
                newPs.className = "reviewP"
                newPs.innerText = `"${reviewArr}"`
    
          /*  let delBtns = document.createElement('button')
                delBtns.className = "delete"
                delBtns.innerText = "Delete"
    
            let editors = document.createElement('button')
                editors.className = "editor"
                editors.innerText = "Edit"
    
            let editForms = document.createElement('form')
                editForms.className = "editForm"
            let editInputs = document.createElement('input')
                editInputs.type = "text"
                editInputs.className = "editInput"
                editInputs.id = "input"
            let editorSubs = document.createElement('button')
                editorSubs.innerText = "Update" */
                
                foodReviewUls.append(newPs/*, editors, delBtns*/)
                foodReviewUl.append(foodReviewUls)
                foodUl.append(foodReviewUl)

            //We don't want any user to be able to edit or delete any review
      /*  delBtns.addEventListener('click', e =>{
            food.review.splice(index, 1)
            fetch(`http://localhost:3000/foods/${food.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    review: food.review
                }),
            }) 
            .then(res => res.json())
            .then(deleted => {
                foodReviewUls.remove()
            }) 
        })
                    
        editors.addEventListener('click', e => {
            console.log(food.review[index])
            foodReviewShows = !foodReviewShows
            if(foodReviewShows) {
                editForms.append(editInputs, editorSubs)
                foodReviewUls.append(editForms)

                editForms.addEventListener("submit", e => {
                
                    e.preventDefault()
                    console.log(reviewArr)
                    let newInput = e.target.input.value
                    food.review[index] = newInput

                    fetch(`http://localhost:3000/foods/${food.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            review: food.review
                        }),
                    })
                    .then(res => res.json())                                                                                                                                                                                                                                   
                    .then(updatedReview => {
                        newPs.innerText = updatedReview.review.slice(-1)
                    })
                })
                    editInputs.style.display = 'block'
                    editorSubs.style.display = 'block'
                }else {                                                 
                    editInputs.style.display = 'none'
                    editorSubs.style.display = 'none'
                }
            }) */
        })
        
    //Post customer food review 
    foodReviewForm.addEventListener("submit", e => {
        e.preventDefault()
        let newReview = e.target.foodReview.value
         food.review = [...food.review, newReview]

        fetch(`http://localhost:3000/foods/${food.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                review: food.review 
            })
        })
        .then(res => res.json())
        .then(updatedFoodReviews => {               
                let foodReviewUls = document.createElement('ul')
                let newPs = document.createElement('p')
                    newPs.className = "reviewP"
                    newPs.innerText = updatedFoodReviews.review.slice(-1)
        
                let delBtns = document.createElement('button')
                    delBtns.className = "delete"
                    delBtns.innerText = "Delete"
        
                let editors = document.createElement('button')
                    editors.className = "editor"
                    editors.innerText = "Edit"
        
                let editForms = document.createElement('form')
                    editForms.className = "editForm"
                let editInputs = document.createElement('input')
                    editInputs.type = "text"
                    editInputs.className = "editInput"
                    editInputs.id = "input"
                let editorSubs = document.createElement('button')
                    editorSubs.innerText = "Update"
                    
                    foodReviewUls.append(newPs, editors, delBtns)
                    foodReviewUl.append(foodReviewUls)
                    foodUl.append(foodReviewUl)


        delBtns.addEventListener('click', e =>{
            food.review.pop()
            fetch(`http://localhost:3000/foods/${food.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    review: food.review
                }),
            }) 
            .then(res => res.json())
            .then(deleted => {
                foodReviewUls.remove()
            }) 
        })
                    
        editors.addEventListener('click', e => {
            foodReviewShows = !foodReviewShows
            if(foodReviewShows) {
                editForms.append(editInputs, editorSubs)
                foodReviewUls.append(editForms)

                editForms.addEventListener("submit", e => {
                    e.preventDefault()
                    let newInput = e.target.input.value
                    food.review.splice(-1, 1, newInput)

                    fetch(`http://localhost:3000/foods/${food.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            review: food.review
                        }),
                    })
                    .then(res => res.json())                                                                                                                                                                                                                                   
                    .then(updatedReview => {
                        newPs.innerText = updatedReview.review.slice(-1)
                    })
                })
                    editInputs.style.display = 'block'
                    editorSubs.style.display = 'block'
                }else {                                                 
                    editInputs.style.display = 'none'
                    editorSubs.style.display = 'none'
                }
            })                    

                    
                })
            })
                    foodReviewUl.style.display = "block"
                     formInput.style.display = 'block'
                    submitReviewBtn.style.display = 'block'
                }else {
                        formInput.style.display = 'none'
                        submitReviewBtn.style.display = 'none'
                        foodReviewUl.style.display = "none"
                     }    
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
           // overallReview(review)
           
           let newP = document.createElement('p')
        newP.className = "reviewP"
        newP.innerText = `"${review.review}"`
        let reviewList = document.createElement('ul')
        reviewList.append(newP)
        customerReview.append(reviewList)
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
        newP.innerText = `"${review.review}"`
    
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
    
        let reviewList = document.createElement('ul')
    
        reviewList.append(newP, editor, delBtn)
        customerReview.append(reviewList) 
    
        delBtn.addEventListener('click', e => {
            fetch(`http://localhost:3000/reviews/${review.id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(deleteP => {
                reviewList.remove()
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
                menu.style.display = "block"
                customerReview.style.display = "block"
                restaurantReview.style.display = "block"
                reviewHeaderSec.style.display = 'block'
 
    }else {
                menu.style.display = "none"
                customerReview.style.display = "none"
                restaurantReview.style.display = "none"
                homeMenusCounter--
                menu.innerText = ""
                customerReview.innerText = ""
                reviewH.innerText = ""
                reviewHeaderSec.style.display = 'none'
    }
})




contactHeader.addEventListener('click', e => {  
    contactShows = !contactShows
    if(contactShows && contactCounter == 0) {
        contactCounter++
        let contactAdd = document.createElement('p')
        contactAdd.className = "contactAdd"
        contactAdd.innerText = "Address: 60 W 23rd St"
        let contactPh = document.createElement('p')
        contactPh.className = "contactPh"
        contactPh.innerText = "Phone: (212) 989-3122"
        let contactEm = document.createElement('p')
        contactEm.className = "contactEm"
        contactEm.innerText = "Email: customerfeedback@outbacksteakhouse.com"
    
        contactUl.append(contactAdd, contactPh, contactEm)
        contactInfoDiv.append(contactUl)

        contactUl.style.display = "block"
    }else {
        contactUl.style.display = "none"
        contactCounter--
        contactUl.innerText = " "
    }
})

let homeButton = document.querySelector('li#home')

function reload() {
    reload = location.reload();
}

homeButton.addEventListener("click", reload, false);
    




