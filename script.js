function getRecipe(e) {
  e.preventDefault();

  let url = "https://www.themealdb.com/api/json/v1/1/random.php";

  fetch(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    updateRecipe(json);
  });

}

function updateRecipe(json) {
  
  let titleBlock = "";

  titleBlock += "<h2>" + json["meals"][0]["strMeal"] + "</h2>";
  titleBlock += "<p> Area: " + json["meals"][0]["strArea"] + "<p>";
  titleBlock += "<p> Category: " + json["meals"][0]["strCategory"] + "<p>";
  
  document.getElementById("heading").innerHTML = titleBlock;
  
  let hasIngredients = true;
  let num = 1;
  let results = "";

  results += '<div class="content intro-photo">';
  results += '<img class="content" src="' + json["meals"][0]["strMealThumb"] + '" alt="recipe-picture"></img>';
  results += "</div>";

  results += '<div class="content intro">';
  results += '<div class="content">';
  results += '<h3>Ingredients</h3>';
  results += "</div>";
  results += '<div class="content">';
  results += "<ul>";
  while (hasIngredients) {
    ingrName = "strIngredient" + num.toString();
    ingrAmount = "strMeasure" + num.toString();
    if (json["meals"][0][ingrName] === "" || num > 20 || json["meals"][0][ingrName] === null) {
      hasIngredients = false;
      break;
    }
    results += "<li> " + json["meals"][0][ingrAmount] + " " + json["meals"][0][ingrName] + "</li>";
    num++;
  }
  results += "</ul>";
  results += "</div>";
  results += "</div>";
  document.getElementById("ingredients").innerHTML = results;

  document.getElementById("instructions").innerHTML = "<h3>Instructions</h3> <p>" + json["meals"][0]["strInstructions"]; + "</p>";


  let url = json["meals"][0]["strYoutube"]
  url = url.replace("watch?v=", "embed/");
  document.getElementById("video").innerHTML = '<iframe src="' + url + '"></iframe>';

}

document.getElementById('getRecipe').addEventListener('click', getRecipe);
