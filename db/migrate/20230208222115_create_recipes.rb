class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.integer :readyIn
      t.string :image
      t.string :summary
      t.string :instructions
      t.text :ingredients
      t.string :sourceURL
      t.boolean :liked

      t.timestamps
    end
  end
end
