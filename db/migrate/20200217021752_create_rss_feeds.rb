class CreateRssFeeds < ActiveRecord::Migration[5.2]
  def change
    create_table :rss_feeds do |t|
      t.string :url, null: false
      t.json :data
      
      t.timestamps null: false
    end
  end
end
