
const RAN_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/random.php';
const CATEGORY_API = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const FILTER_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const SEARCH_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const mealsSuggested = document.querySelectorAll('.meal');

let currentMealID;

// GET DATA ---------
const getSuggested = (url) => {
     mealsSuggested.forEach((meal,index) => {
         fetch(url).then(res => res.json()).then(data => showSuggested(data.meals[0],index));
     })
}

const getCategories = (url) => {
    fetch(url).then(res => res.json()).then(data => showCategories(data.categories));
}

const getFiltered = (e) => {
    const main = document.getElementById('main');
    main.innerHTML = 'Loading...';
    const criteria = e.target.innerHTML;
    fetch(FILTER_API + criteria).then(res => res.json()).then(data => showFiltered(data.meals));
}

const getSearched = () => {
    const main = document.getElementById('main');
    main.innerHTML = 'Loading...';
    const criteria = document.getElementById('search').value;
    console.log(criteria);
    fetch(SEARCH_API + criteria).then(res => res.json()).then(data => {
        if(data.meals == null){
            main.innerHTML = '<h6>No results found...</h6>';
        }else{
            showFiltered(data.meals);
        }
    });
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
            <h3 onclick="getFiltered(event)">${category.strCategory}</h3>
        `;
        categoryContainer.appendChild(element);
    
    })
}

const showFiltered = (data) => {
    const main = document.getElementById('main');
    main.innerHTML = '';
    // https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}
    data.forEach(meal => {
        const element = document.createElement('div');
        element.classList.add('meal-main');
        element.innerHTML=`
        <h4>${meal.strMeal}</h4>
        <div class="meal-main-image" style="background-image:url(${meal.strMealThumb});">
            <div class="meal-main-image-text">
                <a href="single-meal.html"><i id="${meal.idMeal}" class="fas fa-search-plus"></i></a>
            </div>
        </div>
    `;

    main.appendChild(element);
    })

}

// FUNCTION CALLS -----------------
const form = document.getElementById('search-container');

form.addEventListener('submit',e => {
    e.preventDefault();
    getSearched();
})

getSuggested(RAN_MEAL_API);
getCategories(CATEGORY_API);

