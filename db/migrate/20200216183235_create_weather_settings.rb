class CreateWeatherSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :weather_settings do |t|
      t.boolean :custom, default: false
      t.string :longitude
      t.string :latitude

      t.timestamps null: false
    end
  end
end
