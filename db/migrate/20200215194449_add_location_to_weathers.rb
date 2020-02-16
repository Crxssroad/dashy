class AddLocationToWeathers < ActiveRecord::Migration[5.2]
  def change
    add_column :weathers, :location, :json, null: false
  end
end
