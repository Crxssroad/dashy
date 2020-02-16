class CreateWeathers < ActiveRecord::Migration[5.2]
  def change
    create_table :weathers do |t|
      t.string :longitude, null: false
      t.string :latitude, null: false

      t.timestamps null: false
    end
  end
end
