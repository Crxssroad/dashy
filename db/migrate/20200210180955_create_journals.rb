class CreateJournals < ActiveRecord::Migration[5.2]
  def change
    create_table :journals do |t|
      t.string :title, null: false
      t.text :description
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
