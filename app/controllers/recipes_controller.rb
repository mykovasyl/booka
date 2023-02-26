class RecipesController < ApplicationController
  skip_before_action :authorize, only: :create

  def create
    recipe = Recipe.create!(new_recipe_params)
    recipe.update({ingredients: params[:ingredients]})
    render json: recipe, status: :accepted
  end

  def destroy
    recipe_to_delete = find_recipe
    recipe_to_delete.destroy
    head :no_content
  end

  private

  def new_recipe_params
    params.permit(:title, :readyIn, :image, :summary, :instructions, :ingredients, :sourceURL, :user_id)
  end

  def find_recipe
    Recipe.find(params[:id])
  end

end