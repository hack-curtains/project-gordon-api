# Gorden API Spec

## Recipes

---

### `get` `/recipes`

Returns an array of recipes with minimal information needed to render a recipe card. Will not include full recipe data e.g. instructions to minimize size

| Parameters | Description                            | Type  | Default |
| ---------- | -------------------------------------- | ----- | ------- |
| page       | the page number of results to return   | query | 1       |
| count      | the number of results to show per page | query | 10      |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "totalRows": 10795,
  "queryRows": 10,
  "rows": [
    {
      "id": 2,
      "title": "Anchovies Appetizer With Breadcrumbs & Scallions",
      "image": "https://spoonacular.com/recipeImages/2-556x370.jpg",
      "servings": 8,
      "summary": "Long text description of recipe with HTML tags",
      "tags": ["antipasti", "starter"],
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

### `get` `/recipes/:id`

Returns an object containing the recipe

| Parameters | Description                    | Type | Default |
| ---------- | ------------------------------ | ---- | ------- |
| id         | the id of the recipe to return | path | n/a     |

Example Response

```json
{
  "id": 37,
  "title": "Roasted Cauliflower With Anchovy Bread Crumbs",
  "aggregateLikes": 13,
  "summary": "HTML summary of recipe",
  "readyInMinutes": 60,
  "servings": 3,
  "image": "https://spoonacular.com/recipeImages/37-556x370.jpg",
  "pricePerServing": 330.28,
  "sourceName": "Food Republic",
  "sourceUrl": "http://www.foodrepublic.com/2012/11/09/roasted-cauliflower-anchovy-bread-crumbs-recipe",
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
  "instructionSections": 1,
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

## Tags

---

### `get` `/tags`

Returns an exhaustive array of all tags

Example Response

```json
[
  { "id": 22, "name": "European", "category": "cuisines", "frequency": 2448 },
  { "id": 20, "name": "Mediterranean", "category": "cuisines", "frequency": 1851 },
  { "id": 11, "name": "American", "category": "cuisines", "frequency": 1448 }
]
```

## Ingredients

---

### `get` `/ingredients`

Returns an exhaustive array of all tags

Example Response

```json
[
  { "id": 2047, "name": "salt", "category": "Spices and Seasonings", "frequency": 3855 },
  { "id": 11215, "name": "garlic", "category": "Produce", "frequency": 3639 },
  { "id": 19335, "name": "sugar", "category": "Baking", "frequency": 2529 }
]
```

## Search

---

The search endpoint will return a paginated list of results that match all tags or ingredients passed. Passing Sugar + Butter for example, will only return recipes that contain BOTH sugar and butter.

### `get` `/search/:ids/ingredients

Takes a comma separated list of ingredient ids and returns an array of recipes that contain ALL ingredients passed.

| Parameters | Description                              | Type  | Default |
| ---------- | ---------------------------------------- | ----- | ------- |
| ids        | a comma separated list of ingredient_ids | path  | n/a     |
| page       | the page number of results to return     | query | 1       |
| count      | the number of results to show per page   | query | 10      |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "queryRows": 10,
  "totalRows": 1225,
  "rows": [{ recipe1 }, { recipe2 } ]
}
```

### `get` `/search/:ids/tags

Takes a comma separated list of tag_ids and returns an array of recipes that contain ALL tags passed.

| Parameters | Description                            | Type  | Default |
| ---------- | -------------------------------------- | ----- | ------- |
| ids        | a comma separated list of tag_ids      | path  | n/a     |
| page       | the page number of results to return   | query | 1       |
| count      | the number of results to show per page | query | 10      |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "queryRows": 10,
  "totalRows": 1225,
  "rows": [{ recipe1 }, { recipe2 } ]
}
```

## Filter

---

The search endpoint will return recipes that DO NOT match any of the tags or ingredients passed in.

### `get` `/filter/:ids/ingredients

Takes a comma separated list of ingredient ids and returns an array of recipes that DO NOT CONTAIN any of the ingredients passed.

| Parameters | Description                              | Type  | Default |
| ---------- | ---------------------------------------- | ----- | ------- |
| ids        | a comma separated list of ingredient_ids | path  | n/a     |
| page       | the page number of results to return     | query | 1       |
| count      | the number of results to show per page   | query | 10      |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "queryRows": 10,
  "totalRows": 1225,
  "rows": [{ recipe1 }, { recipe2 } ]
}
```

### `get` `/filter/:ids/tags

Takes a comma separated list of tag_ids and returns an array of recipes that DO NOT CONTAIN any of the ingredients passed.

| Parameters | Description                            | Type  | Default |
| ---------- | -------------------------------------- | ----- | ------- |
| ids        | a comma separated list of tag_ids      | path  | n/a     |
| page       | the page number of results to return   | query | 1       |
| count      | the number of results to show per page | query | 10      |

Example Response

```json
{
  "page": 1,
  "count": 10,
  "queryRows": 10,
  "totalRows": 1225,
  "rows": [{ recipe1 }, { recipe2 } ]
}
```
