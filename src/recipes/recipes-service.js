const RecipeService = {
    //relevant
    getRecipes(db) {
        return db
            .from('recipes')
            .select('*')
    },
    getRecipeById(db, recipes_id) {
        return db
            .from('recipes')
            .select('*')
            .where('recipes.id', recipes_id)
            .first()
    },
    getDietByUserId(db, user_id) {
        // knex raw is sql query which needs to be excuted by knex without any shortcuts (ex:.select('*') .where('recipes.id', recipes_id))
        // joining recipe and recipe_details table
        // input is recipe.user_id  (re.user_id = ${user_id};)
        // table connection is recipes.spoonacular_id = recipe_details.spoonacular_id (re.spoonacular_id = rd.spoonacular_id)
        // output is recipe_details.diet.name (rd.diet_name)
        // The DISTINCT clause is used in the SELECT statement to remove duplicate rows from a result set.
        return db.raw(`
                SELECT	
                    DISTINCT rd.diet_name
                FROM 
                    recipes re
                LEFT JOIN 
                    recipe_details rd 
                ON 
                    re.spoonacular_id = rd.spoonacular_id
                WHERE 
                    re.user_id = ${user_id};
                `);
    },

    getRecipesByDietByUserId(db, user_id) {
        // knex raw is sql query which needs to be excuted by knex without any shortcuts (ex:.select('*') .where('recipes.id', recipes_id))
        // joining recipe and recipe_details table
        // input is recipe.user_id  (re.user_id = ${user_id};)
        // table connection is recipes.spoonacular_id = recipe_details.spoonacular_id (re.spoonacular_id = rd.spoonacular_id)
        // output is recipe_details.diet.name (rd.diet_name)
        // The DISTINCT clause is used in the SELECT statement to remove duplicate rows from a result set.
        // asc means asending.
        return db.raw(`
                SELECT	
                    re.id, re.recipe_name, re.recipe_img, re.spoonacular_id,
                    rd.diet_name, rd.recipe_ingredients, rd.nutrition_info, rd.recipe_equipment, rd.recipe_instruction
                FROM 
                    recipes re
                LEFT JOIN 
                    recipe_details rd 
                ON 
                    re.spoonacular_id = rd.spoonacular_id
                WHERE 
                    re.user_id = ${user_id}
                ORDER BY 
                    rd.diet_name asc; 
                `);

    },

    //relevant
    insertRecipe(db, newRecipe) {
        return db
            .insert(newRecipe)
            .into('recipes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //relevant
    updateRecipe(db, recipes_id, newRecipe) {
        return db('recipes')
            .where({
                id: recipes_id
            })
            .update(newRecipe, returning = true)
            .returning('*')
    },
    //relevant
    deleteRecipe(db, recipes_id) {
        return db('recipes')
            .where({
                'id': recipes_id
            })
            .delete()
    }
}

module.exports = RecipeService
