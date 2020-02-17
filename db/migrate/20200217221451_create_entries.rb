class CreateEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :entries do |t|
      t.string :title, default: 'Untitled'
      t.text :body

      t.timestamps null: false
    end
  end
end
