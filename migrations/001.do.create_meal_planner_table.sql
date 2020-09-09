CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (225) NOT NULL
);

CREATE TABLE recipes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    spoonacular_id INTEGER NOT NULL,
    recipe_name VARCHAR (255) NOT NULL,
    recipe_img  VARCHAR (255) NOT NULL
);


CREATE TABLE recipe_details (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    recipe_id INTEGER
        REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
    spoonacular_id INTEGER NOT NULL,
    diet_name VARCHAR (255) NOT NULL,
    recipe_name VARCHAR (255) NOT NULL,
    recipe_img VARCHAR (255) NOT NULL,
    recipe_ingredients VARCHAR (255) NOT NULL,
    nutrition_info VARCHAR (255) NOT NULL,
    recipe_equipment VARCHAR (255) NOT NULL,
    recipe_instruction VARCHAR (255) NOT NULL
);

-- CREATE TABLE pancake (
--   id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
--   title TEXT NOT NULL,
--   completed BOOLEAN DEFAULT FALSE
-- );