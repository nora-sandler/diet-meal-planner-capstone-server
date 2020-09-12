const Recipe_detailService = {
    //relevant
    getRecipe_details(db) {
        return db
            .from('recipe_details')
            .select('*')
    },
    getRecipe_detailById(db, recipe_detail_id) {
        return db
            .from('recipe_details')
            .select('*')
            .where('recipe_detail.id', recipe_detail_id)
            .first()
    },
    //relevant
    insertRecipe_detail(db, newRecipe_detail) {
        return db
            .insert(newRecipe_detail)
            .into('recipe_details')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //relevant
    updateRecipe_detail(db, recipe_detail_id, newRecipe_detail) {
        return db('recipe_details')
            .where({
                id: recipe_detail_id
            })
            .update(newRecipe_detail, returning = true)
            .returning('*')
    },
    //relevant
    deleteRecipe_detail(db, recipe_detail_id) {
        return db('recipe_details')
            .where({
                'id': recipe_detail_id
            })
            .delete()
    }
}

module.exports = Recipe_detailService
