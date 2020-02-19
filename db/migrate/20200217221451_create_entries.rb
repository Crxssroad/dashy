class CreateEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :entries do |t|
      t.string :title, null: false, default: 'Untitled'
      t.text :body
      t.belongs_to :journal, null: false

      t.timestamps null: false
    end
  end
end
