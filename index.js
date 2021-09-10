
const RAN_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/random.php';
const CATEGORY_API = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const FILTER_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const SEARCH_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ID_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
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
                <button ><i onclick="showSingleMeal(event)" id='${meal.idMeal}' class="fas fa-search-plus"></i></button>
            </div>
        </div>
    `;

    main.appendChild(element);
    })
}
    const showSingleMeal = (event) => {

        const modal = document.getElementById('modal-wrapper');
        modal.style.display = 'block';
        const id = event.target.id;

        fetch(ID_API + id).then(res => res.json()).then(data => {
            const meal = data.meals[0];
            const modalName = document.getElementById('modal-name');
            const modalType = document.getElementById('modal-type');
            const modalArea = document.getElementById('modal-area');
            const modalInstr = document.getElementById('modal-instr');
            const modalImage = document.getElementById('modal-image');

            modalImage.style.backgroundImage = `url(${meal.strMealThumb})`;
            modalName.innerHTML = `${meal.strMeal}`;
            modalType.innerHTML = `${meal.strCategory}`;
            modalArea.innerHTML = `${meal.strArea}`;
            modalInstr.innerHTML = `${meal.strInstructions}`;
        });
    }




// FUNCTION CALLS -----------------
const form = document.getElementById('search-container');

form.addEventListener('submit',e => {
    e.preventDefault();
    getSearched();
})

// EXIT MODAL
const closeModal = () => {
    const modal = document.getElementById('modal-wrapper');
    modal.style.display = 'none';
}


getSuggested(RAN_MEAL_API);
getCategories(CATEGORY_API);

