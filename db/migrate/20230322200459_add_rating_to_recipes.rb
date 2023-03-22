class AddRatingToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :rating, :float
  end
end
