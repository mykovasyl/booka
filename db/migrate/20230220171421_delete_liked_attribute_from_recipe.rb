class DeleteLikedAttributeFromRecipe < ActiveRecord::Migration[7.0]
  def change
    remove_column :recipes, :liked
  end
end
