window.onload = init;

function init()
{
    let hummus_button = document.getElementById("hummus")
    hummus_button.addEventListener("click", () => injectRecipe("hummus.json"));

    let pico_button = document.getElementById("pico")
    pico_button.addEventListener("click", () => injectRecipe("pico de gallo.json"));

    injectRecipe("hummus.json")
}

async function getText(filename) {
    return await (await fetch("..\\recipes\\"+filename)).json()
}

async function injectRecipe(filename) {
    const obj = JSON.parse(JSON.stringify(await getText(filename)));

    insertTitle(obj)

    insertIngredients(obj)

    insertInstructions(obj)

    insertAdditionalInfo(obj)

    insertCredit(obj)
}

function insertTitle(obj)
{
    let title = document.getElementById('title');
    title.innerText = obj.title
}

function insertIngredients(obj)
{
    const ingredients_list=document.getElementById('ingredients_list');
    ingredients_list.innerHTML = '';
    const ingredients = obj.ingredients

    for(let i = 0; i < ingredients.length; i++) {
        const li = document.createElement('li');
        const ingredient = JSON.parse(JSON.stringify(ingredients[i]))
        if(!ingredient.hasOwnProperty("alternative_name"))
        {
            li.innerText = ingredient.amount + " " + ingredient.name
        } else {
            const alternative_amount = ingredient.hasOwnProperty("alternative_amount") ?  ingredient.alternative_amount : ingredient.amount
            li.appendChild(createSelector(ingredient.amount + " " + ingredient.name, alternative_amount + " " + ingredient.alternative_name))
        }
        ingredients_list.appendChild(li);
    }
}

function insertInstructions(obj)
{
    const steps_list=document.getElementById('instructions_list');
    steps_list.innerHTML = '';
    const instructions = obj.instructions

    for(let i = 0; i < instructions.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = instructions[i];   // Use innerHTML to set the text
        steps_list.appendChild(li);
    }
}

function insertAdditionalInfo(obj)
{
    const additional_info_section = document.getElementById("additional_info")

    if(obj.hasOwnProperty('additional_info'))
    {
        show(additional_info_section)
        const p = additional_info_section.getElementsByTagName("p")[0]
        p.innerText = obj.additional_info
    } else {
        hide(additional_info_section)
    }
}

function insertCredit(obj)
{
    const credit_section = document.getElementById("credit")

    if(obj.hasOwnProperty('credit'))
    {
        show(credit_section)
        const ps = credit_section.getElementsByTagName("p")
        const author_p = ps[0]
        const link_p = ps[1]
        const credit = obj.credit

        if(credit.hasOwnProperty('author_name'))
        {
            show(author_p)
            const anchor = author_p.getElementsByTagName("a")[0]
            anchor.innerText = credit["author_name"]
            if(credit.hasOwnProperty('author_link'))
            {
                anchor.href = credit["author_link"]
            }
        } else {
            hide(author_p)
        }

        if(credit.hasOwnProperty('recipe_link'))
        {
            show(link_p)
            const anchor = link_p.getElementsByTagName("a")[0]
            anchor.href = credit.link
            anchor.innerText = credit.link
        } else {
            hide(link_p)
        }
    } else {
        hide(credit_section)
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

function show(element)
{
    element.style.display = "block"
}

function hide(element)
{
    element.style.display = "none"
}