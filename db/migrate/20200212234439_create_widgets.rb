class CreateWidgets < ActiveRecord::Migration[5.2]
  def change
    create_table :widgets do |t|
      t.belongs_to :user, null: false
      t.integer :position, null: false
      t.references :modulable, polymorphic: true

      t.timestamps
    end
  end
end
