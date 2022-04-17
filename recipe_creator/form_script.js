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

    const ingredient_template = `

        <div class="instruction">
            <h3>Ingredient #${ingredient_count}</h3>

            <label>Ingredient Name:</label>
            <input type="text" name="ingredients[${ingredient_count}][name]" required><br>

            <label>Ingredient Amount:</label>
            <input type="text" name="ingredients[${ingredient_count}][amount]" required><br>

            <label>Alternative Ingredient Name:</label>
            <input type="text" name="ingredients[${ingredient_count}][alternative_name]"><br>

            <label>Alternative Ingredient Amount:</label>
            <input type="text" name="ingredients[${ingredient_count}][alternative_amount]">
        </div>
    `;
    ingredients_div.insertAdjacentHTML("beforeend", ingredient_template);
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
    instruction_count++
    const instruction_template = `
    <div class="instruction">
        <label>Step ${instruction_count}</label>
            <textarea rows="10" name="instructions[${instruction_count}]" required></textarea>
    </div>
`
    const instructions_div = document.getElementById("instructions")

    instructions_div.insertAdjacentHTML("beforeend", instruction_template)
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