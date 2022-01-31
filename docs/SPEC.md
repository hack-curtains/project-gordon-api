<h1>Gorden API Spec
  <a href="#recipes">/recipes</a>
  <a href="#tags">/tags</a>
  <a href="#ingredients">/ingredients</a>
  <a href="#search">/search</a>
  <a href="#filter">/filter</a>
  <a href="#users">/users</a>
</h1>

<h2 id='recipes'>Recipes</h2>

<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/recipes</code>
  <a href='recipes' target="_blank">/recipes</a>
</h3>

Returns an array of recipes with minimal information needed to render a recipe card. Will not include full recipe data e.g. instructions to minimize size

| Parameters | Description                            | Type  | Default   |
| ---------- | -------------------------------------- | ----- | --------- |
| page       | the page number of results to return   | query | 1         |
| count      | the number of results to show per page | query | 10        |
| sort       | 'default', 'likes', 'price'            | query | 'default' |
| direction  | 'asc' desc'                            | query | 'desc'    |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "sort": "default",
  "direction": "asc",
  "totalRows": 10795,
  "queryRows": 10,
  "rows": [
    {
      "id": 2,
      "title": "Anchovies Appetizer With Breadcrumbs & Scallions",
      "image": "https://spoonacular.com/recipeImages/2-556x370.jpg",
      "servings": 8,
      "pricePerServing": 330.28,
      "aggregateLikes": 13,
      "summary": "Long text description of recipe with HTML tags",
      "tags": [{ "tag_id": 1, "name": "antipasti", "category": "dish" }],
      "ingredients": [
        {
          "ingredient_id": 15001,
          "name": "boquerones",
          "original": "6 oz marinated anchovies"
        },
        {
          "ingredient_id": 18064,
          "name": "bread",
          "original": "2 oz day-old bread"
        }
      ],
      "readyInMinutes": 15
    }
  ]
}
```

<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/recipes/:id</code>
  <a href='recipes/2' target="_blank">/recipes/2</a>
</h3>

Returns an object containing the recipe

| Parameters | Description                    | Type | Default |
| ---------- | ------------------------------ | ---- | ------- |
| id         | the id of the recipe to return | path | n/a     |

Example Response

```json
{
  "id": 2,
  "title": "Roasted Cauliflower With Anchovy Bread Crumbs",
  "likes": 13,
  "summary": "HTML summary of recipe",
  "time": 60,
  "servings": 3,
  "image": "https://spoonacular.com/recipeImages/37-556x370.jpg",
  "price": 330.28,
  "source_name": "Food Republic",
  "source_url": "http://www.foodrepublic.com/2012/11/09/roasted-cauliflower-anchovy-bread-crumbs-recipe",
  "ingredients": [
    {
      "ingredient_id": 1034053,
      "name": "extra virgin olive oil",
      "original": "1/4 cup extra virgin olive oil"
    },
    {
      "ingredient_id": 1034053,
      "name": "extra virgin olive oil",
      "original": "2 tablespoons extra virgin olive oil"
    }
  ],
  "sections": 1,
  "instructions": [
    {
      "name": "",
      "steps": ["Preheat oven to 400 degrees. ", "Place in oven and cook until "]
    }
  ],
  "tags": ["side dish", "dairy free", "pescatarian"],
  "index": 2,
  "createdAt": "2022-01-29T13:57:31.121Z",
  "updatedAt": "2022-01-29T13:57:31.121Z"
}
```

<h2 id='tags'>Tags</h2>

<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/tags</code>
  <a href='tags' target="_blank">/tags</a>
</h3>

Returns an exhaustive array of all tags

Example Response

```json
[
  { "id": 22, "name": "European", "category": "cuisines", "frequency": 2448 },
  { "id": 20, "name": "Mediterranean", "category": "cuisines", "frequency": 1851 },
  { "id": 11, "name": "American", "category": "cuisines", "frequency": 1448 }
]
```

<h2 id='ingredients'>Ingredients</h2>
<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/ingredients</code>
  <a href='ingredients' target="_blank">/ingredients</a>
</h3>

Returns an exhaustive array of all tags

Example Response

```json
[
  { "id": 2047, "name": "salt", "category": "Spices and Seasonings", "frequency": 3855 },
  { "id": 11215, "name": "garlic", "category": "Produce", "frequency": 3639 },
  { "id": 19335, "name": "sugar", "category": "Baking", "frequency": 2529 }
]
```

<h2 id='search'>Search</h2>
<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/search/ingredients</code>
  <a href='search/ingredients/?ids=2,3&sort=likes&direction=desc' target="_blank">/search/ingredients?ids=2,3</a>
</h3>

Takes a comma separated list of ingredient ids and returns an array of recipes that contain ALL ingredients passed.

| Parameters | Description                              | Type  | Default   |
| ---------- | ---------------------------------------- | ----- | --------- |
| ids        | a comma separated list of ingredient_ids | query | n/a       |
| page       | the page number of results to return     | query | 1         |
| count      | the number of results to show per page   | query | 10        |
| sort       | 'default', 'likes', 'price'              | query | 'default' |
| direction  | 'asc' desc'                              | query | 'desc'    |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "ids": [2047, 11215],
  "sort": "likes",
  "direction": "desc",
  "totalRows": 1225,
  "queryRows": 10,
  "rows": [{ recipe1 }, { recipe2 } ]
}
```

<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/search/tags</code>
  <a href='search/tags?ids=11,12&sort=likes&direction=desc' target="_blank">/search/tags?11,12</a>
</h3>

Takes a comma separated list of tag_ids and returns an array of recipes that contain ALL tags passed.

| Parameters | Description                            | Type  | Default   |
| ---------- | -------------------------------------- | ----- | --------- |
| ids        | a comma separated list of tag_ids      | query | n/a       |
| page       | the page number of results to return   | query | 1         |
| count      | the number of results to show per page | query | 10        |
| sort       | 'default', 'likes', 'price'            | query | 'default' |
| direction  | 'asc' desc'                            | query | 'desc'    |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "ids": [32,16],
  "sort": "likes",
  "direction": "desc",
  "totalRows": 3272,
  "queryRows": 10,
  "rows": [{ recipe1 }, { recipe2 } ]
}
```

<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/search</code>
  <a href='search?query=garlic&tag_ids=11,12' target="_blank">/search?query=garlic&tag_ids=11,12</a>
</h3>

Will search any combination of the following parameters and return a result set that matches EVERY
tag_ids AND ingredient_id AND title matching 'query'. This endpoint should only be used when performing
text searches. It will be significantly faster to use the `/search/tag` or `/search/ingredient` endpoints
for queries without text lookups.

| Parameters     | Description                                 | Type  | Default   |
| -------------- | ------------------------------------------- | ----- | --------- |
| tag_ids        | a comma separated list of ingredient_ids    | query | n/a       |
| ingredient_ids | a comma separated list of ingredient_ids    | query | n/a       |
| query          | a free text query that matches recipe title | query | n/a       |
| page           | the page number of results to return        | query | 1         |
| count          | the number of results to show per page      | query | 10        |
| sort           | 'default', 'likes', 'price'                 | query | 'default' |
| direction      | 'asc' desc'                                 | query | 'desc'    |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "ids": [2047, 11215],
  "sort": "likes",
  "direction": "desc",
  "totalRows": 1225,
  "queryRows": 10,
  "rows": [{ recipe1 }, { recipe2 } ]
}
```

<h2 id='filter'>Filter</h2>
<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/filter/ingredients</code>
  <a href='filter/ingredients/?ids=25&sort=likes&direction=desc' target="_blank">/filter/ingredients?ids=25</a>
</h3>

Takes a comma separated list of ingredient ids and returns an array of recipes that DO NOT CONTAIN any of the ingredients passed.

| Parameters | Description                              | Type  | Default   |
| ---------- | ---------------------------------------- | ----- | --------- |
| ids        | a comma separated list of ingredient_ids | query | n/a       |
| page       | the page number of results to return     | query | 1         |
| count      | the number of results to show per page   | query | 10        |
| sort       | 'default', 'likes', 'price'              | query | 'default' |
| direction  | 'asc' desc'                              | query | 'desc'    |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "ids": [2047, 11215],
  "sort": "likes",
  "direction": "desc",
  "totalRows": 1225,
  "queryRows": 10,
  "rows": [{ recipe1 }, { recipe2 } ]
}
```

<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/filter/tags</code>
  <a href='filter/tags?ids=11&sort=likes&direction=desc' target="_blank">/filter/tags?11</a>
</h3>

Takes a comma separated list of tag_ids and returns an array of recipes that DO NOT CONTAIN any of the ingredients passed.

| Parameters | Description                            | Type  | Default   |
| ---------- | -------------------------------------- | ----- | --------- |
| ids        | a comma separated list of tag_ids      | query | n/a       |
| page       | the page number of results to return   | query | 1         |
| count      | the number of results to show per page | query | 10        |
| sort       | 'default', 'likes', 'price'            | query | 'default' |
| direction  | 'asc' desc'                            | query | 'desc'    |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "ids": [32,16],
  "sort": "likes",
  "direction": "desc",
  "totalRows": 3272,
  "queryRows": 10,
  "rows": [{ recipe1 }, { recipe2 } ]
}
```

<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/filter</code>
  <a href='filter?query=garlic&ingredient_ids=3' target="_blank">/filter?query=garlic&ingredient_ids=3</a>
</h3>

Will search any combination of the following parameters and return a result set that exludes EVERY
tag_ids AND ingredient_id AND title matching 'query'. This endpoint should only be used when performing
text searches. It will be significantly faster to use the `/filter/tag` or `/filter/ingredient` endpoints
for queries without text lookups.

| Parameters     | Description                                 | Type  | Default   |
| -------------- | ------------------------------------------- | ----- | --------- |
| tag_ids        | a comma separated list of ingredient_ids    | query | n/a       |
| ingredient_ids | a comma separated list of ingredient_ids    | query | n/a       |
| query          | a free text query that matches recipe title | query | n/a       |
| page           | the page number of results to return        | query | 1         |
| count          | the number of results to show per page      | query | 10        |
| sort           | 'default', 'likes', 'price'                 | query | 'default' |
| direction      | 'asc' desc'                                 | query | 'desc'    |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "ids": [2047, 11215],
  "sort": "likes",
  "direction": "desc",
  "totalRows": 1225,
  "queryRows": 10,
  "rows": [{ recipe1 }, { recipe2 } ]
}
```

<h2 id='users'>Users</h2>
<h3>
  <code style='background-color: #27ae60; color: #ecf0f1'>post</code>
  <code style='background-color: #bdc3c7'>/users/:user_id/ingredients/:ingredient_id/add</code>
</h3>

Adds the ingredient to the list of the user's favorite ingredients

| Parameters    | Description                          | Type | Default |
| ------------- | ------------------------------------ | ---- | ------- |
| ingredient_id | the id of the ingredient             | path | n/a     |
| user_id       | passed via body param {user_id: xxx} | path | n/a     |

<h3>
  <code style='background-color: #e67e22; color: #ecf0f1'>put</code>
  <code style='background-color: #bdc3c7'>/users/:user_id/ingredients/:ingredient_id/remove</code>
</h3>

Removes the ingredient from the list of the user's favorite ingredients

| Parameters    | Description              | Type | Default |
| ------------- | ------------------------ | ---- | ------- |
| ingredient_id | the id of the ingredient | path | n/a     |
| user_id       | the id of the user       | path | n/a     |

<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/users/:user_id/ingredients</code>
</h3>

Returns an object containing the user's favorited ingredients

| Parameters | Description        | Type | Default |
| ---------- | ------------------ | ---- | ------- |
| user_id    | the id of the user | path | n/a     |

<hr>

<h3>
  <code style='background-color: #27ae60; color: #ecf0f1'>post</code>
  <code style='background-color: #bdc3c7'>/users/:user_id/recipes/:recipe_id/add</code>
</h3>

Adds the recipe to the list of the user's favorite recipes

| Parameters | Description                          | Type | Default |
| ---------- | ------------------------------------ | ---- | ------- |
| recipe_id  | the id of the recipe                 | path | n/a     |
| user_id    | passed via body param {user_id: xxx} | path | n/a     |

<h3>
  <code style='background-color: #e67e22; color: #ecf0f1'>put</code>
  <code style='background-color: #bdc3c7'>/users/:user_id/recipes/:recipe_id/remove</code>
</h3>

Removes the recipe from the list of the user's favorite recipes

| Parameters | Description                          | Type | Default |
| ---------- | ------------------------------------ | ---- | ------- |
| recipe_id  | the id of the recipe                 | path | n/a     |
| user_id    | passed via body param {user_id: xxx} | path | n/a     |

<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/users/:user_id/recipes</code>
</h3>

Returns an object containing the user's favorited recipes

| Parameters | Description        | Type | Default |
| ---------- | ------------------ | ---- | ------- |
| user_id    | the id of the user | path | n/a     |
