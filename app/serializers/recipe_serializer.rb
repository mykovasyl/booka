class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :readyIn, :image, :summary, :instructions, :ingredients, :sourceURL, :liked
end
