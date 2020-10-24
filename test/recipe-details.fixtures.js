function makeRecipesDetailsArray() {
    return [
        {
            id: 1,
            recipe_id: 1,
            spoonacular_id: 1,
            diet_name: 'testdiet',
            recipe_name: 'testname',
            recipe_img: 'test.jpeg',
            recipe_ingredients: 'test_ingredients',
            nutrition_info: 'test_info',
            recipe_equipment: 'test_equipment',
            recipe_instruction: 'cook',

        },
        {
            id: 2,
            recipe_id: 2,
            spoonacular_id: 2,
            diet_name: 'testdiet',
            recipe_name: 'testname1',
            recipe_img: 'test1.jpeg',
            recipe_ingredients: 'test1_ingredients',
            nutrition_info: 'test1_info',
            recipe_equipment: 'test1_equipment',
            recipe_instruction: 'cook1',

        }
    ];
}; 

function makeMaliciousRecipeDetails() {
    const makeMaliciousRecipeDetails = {
            id: 1,
            recipe_id: 1,
            spoonacular_id: 1,
            diet_name: 'testdiet',
            recipe_name: "Naughty naughty very naughty <script>alert('xss');</script>",
            recipe_img: 'img_naughty.jpeg',
            recipe_ingredients: 'Naughty_ingredients <script>alert("xss");</script>',
            nutrition_info: 'Naughty_info <script>alert("xss");</script>',
            recipe_equipment: 'Naughty_equipment <script>alert("xss");</script>',
            recipe_instruction: 'naughty cook'
    }
    const expectedRecipeDetails = {
        ...maliciousRecipeDetails,
        recipe_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;', // converts script to render it inert
        recipe_img: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;', // converts script to render it inert
        recipe_ingredients: 'Naughty_ingredients &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        nutrition_info: 'Naughty_info &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        recipe_equipment: 'Naughty_equipment &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        recipe_instruction: 'naughty cook'
    }
    return {
        maliciousRecipeDetails,
        expectedRecipeDetails,
    }
}

module.exports = {
    makeRecipesDetailsArray,
    makeMaliciousRecipeDetails,
}