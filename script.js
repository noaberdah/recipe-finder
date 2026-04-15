async function searchRecipes() {
  const query = document.getElementById("searchInput").value;
  const container = document.getElementById("recipes");

  container.innerHTML = "⏳ Loading...";

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await res.json();

  displayRecipes(data.meals);
}

function displayRecipes(meals) {
  const container = document.getElementById("recipes");
  container.innerHTML = "";

  if (!meals) {
    container.innerHTML = "<p>❌ No recipes found</p>";
    return;
  }

  meals.forEach(meal => {
    const div = document.createElement("div");
    div.classList.add("recipe");

    div.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" width="150">
      <br>
      <button onclick="showRecipe(${meal.idMeal})">View Recipe</button>
    `;

    container.appendChild(div);
  });
}

async function showRecipe(id) {
  const container = document.getElementById("recipes");

  container.innerHTML = "⏳ Loading recipe...";

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();

  const meal = data.meals[0];

  // extract ingredients
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    if (ing && ing.trim() !== "") {
      ingredients.push(ing);
    }
  }

  container.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" width="250">

    <h3>Ingredients:</h3>
    <ul>
      ${ingredients.map(i => `<li>${i}</li>`).join("")}
    </ul>

    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>

    <br>
    <button onclick="location.reload()">⬅ Back</button>
  `;
}