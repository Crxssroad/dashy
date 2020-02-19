require 'net/http'
require 'open-uri'

class RssFeedSerializer < ActiveModel::Serializer
  attributes :id, :url, :data

  def data
    feed = object.data
    if self.needs_update?(object.updated_at.to_f)
      feed = self.parse_feed(object.url)
    end
    feed
  end

  def needs_update?(unix_timestamp)
    Time.now.to_i - unix_timestamp > 600
  end

  def parse_feed(url)
    feed_url = "https://api.rss2json.com/v1/api.json?rss_url=#{url}"
    uri = URI(feed_url)
    response = Net::HTTP.get(uri)
    parsed_json = JSON.parse(response)
    parsed_json
  end
end
