class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.text :body
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
