function makeRecipesArray() {
    return [
        {
            id: 1,
            user_id: 1,
            spoonacular_id: 1,
            recipe_name: "baked salmon",
            recipe_img: 'img1.jpeg',

        },
        {
            id: 2,
            user_id: 2,
            spoonacular_id: 2,
            recipe_name: "apple pie",
            recipe_img: 'img_pie.jpeg',

        },
        {
            id: 3,
            user_id: 3,
            spoonacular_id: 3,
            recipe_name: "baked veggies",
            recipe_img: 'img_veg.jpeg'

        },
    ];
}; 

function makeMaliciousRecipe() {
    const maliciousRecipe = {
        id: 1,
        user_id: 1,
        spoonacular_id: 1,
        recipe_name: "Naughty naughty very naughty <script>alert('xss');</script>",
        recipe_img: 'img_naughty.jpeg',


    }
    const expectedRecipe = {
        ...maliciousRecipe,
        recipe_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;', // converts script to render it inert
        recipe_img: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;', // converts script to render it inert
        
    }
    return {
        maliciousRecipe,
        expectedRecipe,
    }
}

module.exports = {
    makeRecipesArray,
    makeMaliciousRecipe,
}