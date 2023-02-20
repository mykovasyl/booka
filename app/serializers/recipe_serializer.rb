class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :readyIn, :image, :summary, :instructions, :ingredients, :sourceURL, :user_id
end
