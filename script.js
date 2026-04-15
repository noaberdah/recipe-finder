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

  console.log("API response:", meals); // 👈 IMPORTANT DEBUG LINE

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
    `;

    container.appendChild(div);
  });
}
