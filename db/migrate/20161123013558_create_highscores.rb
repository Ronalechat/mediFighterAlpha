class CreateHighscores < ActiveRecord::Migration[5.0]
  def change
    create_table :highscores do |t|
      t.integer :wins
      t.integer :losses
      t.integer :draws
      t.text :top

      t.timestamps
    end
  end
end
