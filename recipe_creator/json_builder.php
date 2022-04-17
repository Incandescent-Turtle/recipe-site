
<?php
//echo "<pre>".var_dump($_POST)."</pre>";

//  obj representing the whole recipe
$recipe = new stdClass();

//  sets the title
$recipe->title = trim($_POST["title"]);

/*
 *  Ingredients
 */
//  callback to trim and remove empty members
$mapper = function($arr) {
    return array_map('trim', array_filter($arr));
};
//  injects ingredients with all empty fields removed
$recipe->ingredients = array_values(array_map($mapper, $_POST["ingredients"]));

//  inject instructions trimmed
$recipe->instructions = array_values(array_map('trim', $_POST["instructions"]));

//  injects additional info if applicable
if(!empty($_POST["additional_info"]))
{
    $recipe->additional_info = trim($_POST["additional_info"]);
}

//  injects credit fields if applicable
if(sizeof($_POST["credit"])>0)
{
    $recipe->credit = array_filter($_POST["credit"]);
}

echo "<pre>".json_encode($recipe, JSON_PRETTY_PRINT)."</pre>";