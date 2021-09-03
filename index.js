
const RAN_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/random.php';
const mealsSuggested = document.querySelectorAll('.meal');

const getSuggested = (url) => {
     mealsSuggested.forEach((meal,index) => {
         fetch(url).then(res => res.json()).then(data => showSuggested(data.meals[0],index));
     })
}

const showSuggested = (data,index) => {
    mealsSuggested[index].innerHTML=`<img src=${data.strMealThumb} >`;
}

getSuggested(RAN_MEAL_API);
