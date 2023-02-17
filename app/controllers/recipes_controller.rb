class RecipesController < ApplicationController
  skip_before_action :authorize, only: :create

  def index
    all_recipes
    render json: all_recipes
  end

  def create
    byebug
    recipe = Recipe.create!(new_recipe_params)
    render json: recipe, status: :accepted
  end

  def update
    recipe_to_update = find_recipe
    recipe_to_update.update!(update_recipe_params)
    render json: recipe_to_update, status: :accepted
  end

  def destroy
    recipe_to_delete = find_recipe
    recipe_to_delete.destroy
    head :no_content
  end

  private

  def all_recipes
    Recipe.all
  end

  def new_recipe_params
    params.permit(:title, :readyIn, :image, :summary, :instructions, :ingredients, :sourceURL, :liked, :user_id)
  end

  def update_recipe_params
    params.permit(:title, :readyIn, :image, :summary, :instructions, :ingredients, :sourceURL, :liked)
  end

  def find_recipe
    Recipe.find(params[:id])
  end

end
