window.onload = init;

function init()
{
    injectRecipe("hummus.json")
    let hummus_button = document.getElementById("hummus")
    hummus_button.addEventListener("click", () => injectRecipe("hummus.json"));

    let pico_button = document.getElementById("pico")
    pico_button.addEventListener("click", () => injectRecipe("pico de gallo.json"));
}

async function getText(filename) {
    return await (await fetch("recipes\\"+filename)).json()
}

async function injectRecipe(filename) {
    const obj = JSON.parse(JSON.stringify(await getText(filename)));

    await insertTitle(obj)

    await insertIngredients(obj)

    await insertInstructions(obj)
}

async function insertTitle(obj)
{
    let title = document.getElementById('title');
    title.innerText = obj.title
}

async function insertIngredients(obj)
{
    const ingredients_list=document.getElementById('ingredients');
    ingredients_list.innerHTML = '';
    const ingredients = obj.ingredients

    for(let i = 0; i < ingredients.length; i++) {
        const li = document.createElement('li');
        const ingredient = JSON.parse(JSON.stringify(ingredients[i]))
        if(!ingredient.hasOwnProperty("alternative-name"))
        {
            li.innerText = ingredient.amount + " " + ingredient.name
        } else {
            li.appendChild(createSelector(ingredient.amount + " " + ingredient.name, ingredient["alternative-amount"] + " " + ingredient["alternative-name"]))
        }
        ingredients_list.appendChild(li);
    }
}

async function insertInstructions(obj)
{
    const steps_list=document.getElementById('steps');
    steps_list.innerHTML = '';
    const steps = obj.steps

    for(let i = 0; i < steps.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = steps[i];   // Use innerHTML to set the text
        steps_list.appendChild(li);
    }
}

function createSelector(...items)
{
    const select = document.createElement('select')
    for(let i = 0; i < items.length; i++)
    {
        const option = document.createElement('option')
        option.innerText = items[i]
        select.append(option)
    }
    return select
}