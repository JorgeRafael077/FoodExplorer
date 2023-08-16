const knex = require("../database/knex");

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id;
    const {dish_id} = request.body;

    const [id] = await knex("favorites").insert({
      user_id,
      dish_id
    });

    return response.status(201).json(id);
  }

  async index(request, response) {
    const user_id = request.user.id;

    const favorites = await knex("dishes")
    .select([
      "favorites.id",
      "favorites.dish_id",
      "dishes.name",
      "dishes.category",
      "dishes.description",
      "dishes.image",
    ])
    .innerJoin("favorites", "favorites.dish_id", "dishes.id")
    .groupBy("dish_id")
    .where({ user_id })


    return response.status(200).json(favorites);
  }

  async delete(request, response) {
    const { id } = request.params;
    
    await knex("favorites").where({ id }).delete();

    return response.status(200).json();
  }
}

module.exports = FavoritesController;