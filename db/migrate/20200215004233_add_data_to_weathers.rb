class AddDataToWeathers < ActiveRecord::Migration[5.2]
  def change
    add_column :weathers, :data, :json
  end
end
