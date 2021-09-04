
const RAN_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/random.php';
const CATEGORY_API = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const mealsSuggested = document.querySelectorAll('.meal');

// GET DATA ---------
const getSuggested = (url) => {
     mealsSuggested.forEach((meal,index) => {
         fetch(url).then(res => res.json()).then(data => showSuggested(data.meals[0],index));
     })
}
    const getCagetories = (url) => {
        fetch(url).then(res => res.json()).then(data => showCategories(data.categories));
    }



// SHOW DATA ----------

const categoryContainer = document.getElementById('categories-container');

const showSuggested = (data,index) => {
    mealsSuggested[index].innerHTML=`
        <h4>${data.strMeal}</h4>
        <div class="meal-image" style="background-image:url(${data.strMealThumb});">
            
        <div class='meal-image-text'>
            <h5>Category: ${data.strCategory}</h5>
            <h5>Area: ${data.strArea}</h5>
            <div class="instructions">
                <h5>Instructions:</h5>
                <a href="${data.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
            </div>
        </div>

        </div>
    `;
}

const showCategories = (data) => {
    data.forEach(category => {
        const element = document.createElement('div');
        element.classList.add('category');
        element.innerHTML = `
            <h3>${category.strCategory}</h3>
        `;
        categoryContainer.appendChild(element);
    })
}




// FUNCTION CALLS -----------------
getSuggested(RAN_MEAL_API);
getCagetories(CATEGORY_API);
