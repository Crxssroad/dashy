require 'net/http'
require 'open-uri'

class Api::V1::RssFeedsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    feed = RssFeed.find_or_initialize_by(rss_feed_params)
    if feed.persisted? && needs_update?(feed.updated_at.to_f)
      data = parse_feed(params[:url])

      if data["status"] == "ok"
        feed.data = data
        feed.save
        render json: feed
      else
        render json: data["message"]
      end
    elsif feed.persisted?
      render json: feed
    else
      data = parse_feed(params[:url])
      if data["status"] == "ok"
        feed.data = data
        feed.save
        render json: feed
      else
        render json: data["message"]
      end
    end
  end

  private

  def rss_feed_params
    params.require(:rss_feed).permit(:url)
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
