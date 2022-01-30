# Gorden API Spec

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
  <a href='recipes/37' target="_blank">/recipes/37</a>
</h3>

Returns an object containing the recipe

| Parameters | Description                    | Type | Default |
| ---------- | ------------------------------ | ---- | ------- |
| id         | the id of the recipe to return | path | n/a     |

Example Response

```json
{
  "id": 37,
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

<h3>
  <code style='background-color: #3498db; color: #ecf0f1'>get</code>
  <code style='background-color: #bdc3c7'>/search/ingredients</code>
  <a href='search/ingredients/?ids=2047,11215&sort=likes&direction=desc' target="_blank">/search/ingredients?ids=2047,11215</a>
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
  <a href='search/tags?ids=32,16&sort=likes&direction=desc' target="_blank">/search/tags?32,16</a>
</h3>

Takes a comma separated list of tag_ids and returns an array of recipes that contain ALL tags passed.

| Parameters | Description                            | Type  | Default   |
| ---------- | -------------------------------------- | ----- | --------- |
| ids        | a comma separated list of tag_ids      | path  | n/a       |
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
  <code style='background-color: #bdc3c7'>/filter/ingredients</code>
  <a href='filter/ingredients/?ids=2047,11215&sort=likes&direction=desc' target="_blank">/filter/ingredients?ids=2047,11215</a>
</h3>

Takes a comma separated list of ingredient ids and returns an array of recipes that DO NOT CONTAIN any of the ingredients passed.

| Parameters | Description                              | Type  | Default   |
| ---------- | ---------------------------------------- | ----- | --------- |
| ids        | a comma separated list of ingredient_ids | path  | n/a       |
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
  <code style='background-color: #bdc3c7'>/filter/:ids/tags</code>
  <a href='filter/tags?ids=32,16&sort=likes&direction=desc' target="_blank">/filter/tags?32,16</a>
</h3>

Takes a comma separated list of tag_ids and returns an array of recipes that DO NOT CONTAIN any of the ingredients passed.

| Parameters | Description                            | Type  | Default   |
| ---------- | -------------------------------------- | ----- | --------- |
| ids        | a comma separated list of tag_ids      | path  | n/a       |
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
