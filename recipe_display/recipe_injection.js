window.onload = init;

function init()
{
    let hummus_button = document.getElementById("hummus")
    hummus_button.addEventListener("click", () => injectRecipe("hummus.json"));

    let pico_button = document.getElementById("pico")
    pico_button.addEventListener("click", () => injectRecipe("pico de gallo.json"));

    let pad_thai_button = document.getElementById("pad_thai")
    pad_thai_button.addEventListener("click", () => injectRecipe("pad_thai.json"));


    injectRecipe("hummus.json")
}

async function getText(filename) {
    return await (await fetch("..\\recipes\\"+filename)).json()
}

async function injectRecipe(filename) {
    const obj = JSON.parse(JSON.stringify(await getText(filename)));

    insertTitle(obj)

    insertTime(obj)

    insertClassification(obj)

    insertAllergens(obj)

    insertSuitability(obj)

    insertEquipment(obj)

    insertStorage(obj)

    insertExpiration(obj)

    insertIngredients(obj)

    insertInstructions(obj)

    insertAdditionalInfo(obj)

    insertCredit(obj)
}

function insertTitle(obj)
{
    const title = document.getElementById('title');
    title.innerText = obj.title
}

function insertTime(obj)
{
    const time_section = document.getElementById("time")
    const time_pre = time_section.querySelector("pre")

    if(obj.hasOwnProperty("time"))
    {
        show(time_section)
        const time = obj.time
        time_pre.innerText = "Time Needed: "
        if(time["months"] > 0) time_pre.innerText += time["months"]+"mo"
        if(time["days"] > 0) time_pre.innerText += time["days"]+"d"
        if(time["hours"] > 0) time_pre.innerText += time["hours"]+"h"
        if(time["minutes"] > 0) time_pre.innerText += time["minutes"]+"m"
    } else {
        hide(time_section)
    }
}

function insertClassification(obj)
{
    const classification_section = document.getElementById("classification")
    const classification_p = classification_section.querySelector("p")

    if(obj.hasOwnProperty("classification") && obj.classification.length >=1)
    {
        show(classification_section)
        const classification = obj.classification
        classification_p.innerText = "Classification: " + classification.join(", ")
    } else {
        hide(classification_section)
    }
}
function insertAllergens(obj)
{
    const allergens_section = document.getElementById("allergens")
    const allergens_p = allergens_section.querySelector("p")

    if(obj.hasOwnProperty("allergens") && obj.allergens.length >=1)
    {
        show(allergens_section)
        const allergens = obj.allergens
        allergens_p.innerText = "Allergens: " + allergens.join(", ")
    } else {
        hide(allergens_section)
    }
}

function insertSuitability(obj)
{
    const suitability_section = document.getElementById("suitability")
    const suitability_p = suitability_section.querySelector("p")

    if(obj.hasOwnProperty("suitability") && obj.suitability.length >=1)
    {
        show(suitability_section)
        const suitability = obj.suitability
        suitability_p.innerText = "Suitability: " + suitability.join(", ")
    } else {
        hide(suitability_section)
    }
}

function insertEquipment(obj)
{
    const equipment_section = document.getElementById("equipment")
    const equipment_pre = equipment_section.querySelector("pre")

    if(obj.hasOwnProperty("equipment") && obj.equipment.length >=1)
    {
        show(equipment_section)
        const equipment = obj.equipment
        equipment_pre.innerText = "Equipment: "
        for(let i = 0; i < equipment.length; i++)
        {
           equipment_pre.innerText += equipment[i].join(" or ")
            if(i < equipment.length-1) equipment_pre.innerText += ", "
        }
    } else {
        hide(equipment_section)
    }
}

function insertStorage(obj)
{
    const storage_section = document.getElementById("storage")
    const storage_p = storage_section.querySelector("p")

    if(obj.hasOwnProperty("storage") && Object.keys(obj.storage).length > 0)
    {
        show(storage_section)
        const storage = obj.storage
        storage_p.innerText = ""
        if(storage.hasOwnProperty("storage_method"))
        {
            storage_p.innerText += "Storage Method: " + storage["storage_method"]
        }
        if(storage.hasOwnProperty("note"))
        {
            storage_p.innerText += "\nStorage Note: " + storage["note"]
        }
    } else {
        hide(storage_section)
    }
}

function insertExpiration(obj)
{
    const expiration_section = document.getElementById("expiration")
    const expiration_pre = expiration_section.querySelector("pre")

    if(obj.hasOwnProperty("expiration") && Object.keys(obj.expiration).length > 0)
    {
        show(expiration_section)
        const expiration = obj.expiration
        expiration_pre.innerText = "Expiration: "
        if(expiration["months"] > 0) expiration_pre.innerText += expiration["months"]+"mo"
        if(expiration["days"] > 0) expiration_pre.innerText += expiration["days"]+"d"
    } else {
        hide(expiration_section)
    }
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
            li.innerText = ""
            if(ingredient.hasOwnProperty("optional") && ingredient.optional)
            {
                const pre = document.createElement("pre")
                pre.style = "color:green; display:inline;";
                pre.innerText = "Optional: "
                li.appendChild(pre)
            }
            const ingredient_span = document.createElement("span")
            ingredient_span.innerText += ingredient.amount.join(" or ") + " "
            const span = document.createElement("span")
            span.style = "font-weight: bold;"
            span.innerText = ingredient.name
            ingredient_span.appendChild(span)
            li.appendChild(ingredient_span)
        } else {
            // TODO make custom drop down menu for this to allow the boling of just the ingredient
            const alternative_amount = ingredient.hasOwnProperty("alternative_amount") ?  ingredient.alternative_amount : ingredient.amount
            li.appendChild(createSelector(ingredient.amount.join(" or ") + " " + ingredient.name, alternative_amount.join(" or ") + " " + ingredient.alternative_name))
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
            anchor.href = credit.recipe_link
            anchor.innerText = credit.recipe_link
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