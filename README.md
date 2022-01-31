# project-gordon-api

## AWS Deployment Instructions

The following instructions detail how to deploy 2 docker containers to an EC2.
The Dockerfiles in (a) root directory (b) database, contain instructions on how to create the images
The docker-compose.yml file in root contains instructions on how to run these images in 2 networked containers
and expose port 3000 for incoming requests.

1. Set up an EC2, make sure you expose port 3000, thats what we'll be exposing from our docker container.

2. Once you ssh into your EC2 you need to install docker & docker compose. <a href='https://phoenixnap.com/kb/install-docker-on-ubuntu-20-04'>this tutorial</a> outlines the instructions.

3. Once you have docker set up, you might need to log out and log back in (or even try rebooting the instance).

4. From the root directory in your EC2. Note the github repo contains a SQL file containing the initial data.

`git clone https://github.com/hack-curtains/project-gordon-api.git`

5. cd into the project directory

6. run `docker-compose up --build` -- this should start your docker containers.

## Tests

`npm test`

```bash
 PASS  test/users_ingredients.test.js
  Testing Favorite Ingredients
    ✓ [users/ingredients] - should add an ingredient (29 ms)
    ✓ [users/ingredients] - should add then update if user adds same ingredient twice (12 ms)
    ✓ [users/ingredients] - should add 3 items (9 ms)
    ✓ [users/ingredients] - should add 3 then remove 1 (10 ms)
    ✓ [users/ingredients] - should return an array of items (9 ms)

 PASS  test/filter.test.js
  Testing Recipes Filter
    ✓ Ingredient search should return all matches that contain {ids} (61 ms)
    ✓ Tag search should return all matches that contain {ids} (26 ms)
    ✓ /search?ingredient_ids AND /search/ingredients?ids should return same result set (25 ms)
    ✓ /search?tag_ids AND /search/tags?ids should return same result set (20 ms)
    ✓ Should return a result set where all contain query (14 ms)
    ✓ Should return error when ids are not positive integers (1 ms)

 PASS  test/search.test.js
  Testing Recipes Search
    ✓ Ingredient search should return all matches that contain {ids} (31 ms)
    ✓ Tag search should return all matches that contain {ids} (27 ms)
    ✓ /search?ingredient_ids AND /search/ingredients?ids should return same result set (11 ms)
    ✓ /search?tag_ids AND /search/tags?ids should return same result set (18 ms)
    ✓ Should return a result set where all contain query (33 ms)
    ✓ Should return no rows when query does not exist (12 ms)
    ✓ Should return error when ids are not positive integers (2 ms)

 PASS  test/users_recipes.test.js
  Testing Favorite Recipes
    ✓ [users/recipes] - should add an recipe (20 ms)
    ✓ [users/recipes] - should add then update if user adds same recipe twice (5 ms)
    ✓ [users/recipes] - should add 3 items (11 ms)
    ✓ [users/recipes] - should add 3 then remove 1 (13 ms)
    ✓ [users/recipes] - should return an array of items (12 ms)

 PASS  test/recipes.test.js
  Testing Recipes Sorting and Pagination
    ✓ Should return 200 and default to 10 results (18 ms)
    ✓ Should sort properly on {likes} (5 ms)
    ✓ Should sort properly on {price} (6 ms)
    ✓ Should return {count} results (7 ms)
    ✓ Should paginate properly (16 ms)
    ✓ Should paginate properly with sort (11 ms)
    ✓ Should return error if page is incorrect (2 ms)

 PASS  test/ingredients.test.js
  Testing Ingredients
    ✓ Should return 200 and have correct properties (23 ms)

 PASS  test/tags.test.js
  Testing Tags
    ✓ Should return 200 and have correct properties (19 ms)
```
