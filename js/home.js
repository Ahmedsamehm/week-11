
var allrecipesArr=[]

async function getRecipes(recipes) {
    var response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=pizza`)
    var finalData = await response.json()
    allrecipesArr = finalData.recipes
    displayRecipes()
    console.log(allrecipesArr);
}
function displayRecipes() {
    crtoona = ``
    for (var i = 0; i < allrecipesArr.length;i++){
        crtoona += `
          <div class="col-md-4">
                <div class="">
                    <h3>${allrecipesArr[i].title}</h3>
                    <img src="${allrecipesArr[i].image_url}" class="w-100" alt="">
                </div>
            </div>
        `
    }
    document.getElementById('demo').innerHTML = crtoona
}


getRecipes('green bean')