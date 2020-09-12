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
