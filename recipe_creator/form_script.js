let ingredient_count = 0
let instruction_count = 0

document.getElementById("add_ingredient").addEventListener("click", () => addIngredient())
document.getElementById("remove_ingredient").addEventListener("click", () => removeIngredient())

document.getElementById("add_instruction").addEventListener("click", () => addInstruction())
document.getElementById("remove_instruction").addEventListener("click", () => removeInstruction())


function addIngredient()
{
    const ingredients_div = document.getElementById("ingredients")

    ingredient_count++
    const div = document.createElement("div")
    div.classList.add("ingredient")
    const nameStart = `ingredients[${ingredient_count-1}]`
    const header = document.createElement("h3");
    header.innerText = `Ingredient #${ingredient_count}`
    div.appendChild(header)
    createInputField(div,"Ingredient Name:",nameStart+"[name]", true)
    insertBr(div)
    createInputField(div, "Ingredient Amount:", nameStart+"[amount]", true)
    insertBr(div)
    createInputField(div, "Alternative Ingredient Name:",nameStart+"[alternative_name]", false)
    insertBr(div)
    createInputField(div, "Alternative Ingredient Amount:",nameStart+"[alternative_amount]", false)
    ingredients_div.appendChild(div)

    scroll(120)
}

function removeIngredient()
{
    const ingredients_div = document.getElementById("ingredients")
    const ingredients = ingredients_div.children
    ingredients_div.removeChild(ingredients[ingredients.length-1])
    ingredient_count--
    scroll(-120)
}

function addInstruction()
{
    const instructions_div = document.getElementById("instructions")

    instruction_count++
    const div = document.createElement("div")
    div.classList.add("instruction")
    const area = document.createElement("textarea")
    area.rows = 10
    area.name = `instructions[${instruction_count}]`
    area.required = true
    const label = document.createElement("label")
    label.innerText = `Step ${instruction_count}`
    div.appendChild(label)
    div.appendChild(area)
    instructions_div.appendChild(div)
    scroll(120)
}

function removeInstruction()
{
    instruction_count--
    const instructions_list = document.getElementById("instructions")
    const instructions = instructions_list.children
    instructions_list.removeChild(instructions[instructions.length-1])
    scroll(-120)
}

function createInputField(element, displayName, name, required)
{
    const label = document.createElement("label")
    label.innerText = displayName
    const box = document.createElement("input")
    box.type = "text"
    box.name = name
    box.required = required
    element.appendChild(label)
    element.appendChild(box)
}

function insertBr(element)
{
    element.appendChild(document.createElement("br"))
}

function scroll(y)
{
     window.scrollBy({
        top: y,
        left: 0,
        behavior: 'smooth'
    });
}