const picture = document.querySelector("#cocktailImg")
document.querySelector(".submit").addEventListener("click", getFetch)
document.querySelector(".choice").addEventListener("keyup", (event)=>{
  if(event.key=="Enter") getFetch()
})

let ingredients = document.querySelector(".ingredients")
async function getFetch() {
  ingredients.innerText=""
  
  let drink = document.querySelector('.choice').value
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`
    try{
   
      const response = await fetch(url)
  
      const data = await response.json()
     
      document.querySelector(".directions1").innerHTML = "Directions:"
      document.querySelector(".ingredients1").innerHTML = "Ingredients:"
      let randomSelection = Math.floor(Math.random()*data.drinks.length)
      document.querySelector("h2").innerHTML=data.drinks[randomSelection].strDrink
      document.querySelector("img").src=data.drinks[randomSelection].strDrinkThumb
      let drinkId = await data.drinks[randomSelection].idDrink
      const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
      const data2 = await resp.json()
      document.querySelector(".directions").innerHTML=data2.drinks[0].strInstructions
      for(i=1; i<15; i++){
        const check = `strIngredient${i}`
        const measure = `strMeasure${i}`
        if(data2.drinks[0][check]){
          const p = document.createElement('p')
          const span = document.createElement('span')
          p.innerText=data2.drinks[0][check]
          span.innerText= data2.drinks[0][measure]== null ? "" : `(${data2.drinks[0][measure]})`
          ingredients.appendChild(p)
          p.appendChild(span)
        }
      }
      document.querySelector(".ingredients1").classList.remove("hide")
      document.querySelector(".directions1").classList.remove("hide")
      picture.classList.remove("hide")
    }catch(err){
            document.querySelector("h2").innerHTML="No Drinks Found"
            document.querySelector(".directions").innerHTML = ""
            document.querySelector(".directions1").innerHTML = ""
            document.querySelector(".ingredients1").innerHTML = ""
            picture.classList.add("hide")

      console.log(`error ${err}`)
    }
  }