
<?php
//echo "<pre>".var_dump($_POST)."</pre>";

$recipe_json = new stdClass();

$recipe_json->title = $_POST["title"];

foreach($_POST["ingredients"] as $ingredient)
{
    $ingredient_obj = new stdClass();

    foreach($ingredient as $name => $field)
    {
        if(!empty($field))
        {
            $ingredient_obj->$name = $field;
        }
    }
    $recipe_json->ingredients[] = $ingredient_obj;
}

foreach($_POST["instructions"] as $instruction)
{
    $recipe_json->instructions[] = $instruction;
}

if(!empty($_POST["additional_info"]))
{
    $recipe_json->additional_info = $_POST["additional_info"];
}

$credit_obj = new stdClass();
foreach($_POST["credit"] as $field => $content)
{
    if(!empty($content))
    {
        $credit_obj->$field = $content;
    }
}
if(!sizeof(get_object_vars($credit_obj))==0)
{
    $recipe_json->credit = $credit_obj;
}

echo json_encode($recipe_json, JSON_PRETTY_PRINT);