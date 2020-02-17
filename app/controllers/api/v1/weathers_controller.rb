require 'net/http'
require 'json'

class Api::V1::WeathersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    weather = Weather.find_or_initialize_by(weather_params)
    latitude = weather_params[:latitude]
    longitude = weather_params[:longitude]
    if weather.persisted? && needs_update?(weather.updated_at.to_f)
      data = get_weather_data_from_coords(latitude, longitude)
      weather.data = data
      weather.save
      render json: weather
    elsif weather.persisted?
      render json: weather
    else
      data = get_weather_data_from_coords(latitude, longitude)
      weather.data = data
      location = get_location_from_coords(latitude, longitude)
      weather.location = location
      weather.save
      render json: weather
    end
  end

  private

  def weather_params
    params.require(:weather).permit(:latitude, :longitude)
  end

  def needs_update?(unix_timestamp)
    Time.now.to_i - unix_timestamp > 1800
  end
  def get_weather_data_from_coords(latitude, longitude)
    api_key = ENV["DARK_SKY_API_KEY"]
    dark_sky_url = "https://api.darksky.net/forecast/#{api_key}/#{latitude},#{longitude}/?exclude=[minutely,hourly,alerts,flags]?units=[auto]"
    uri = URI(dark_sky_url)
    response = Net::HTTP.get(uri)
    parsed_json = JSON.parse(response)
    parsed_json
  end

  def get_location_from_coords(latitude, longitude)
    api_key = ENV["LOCATION_IQ_API_KEY"]
    location_iq_url = "https://us1.locationiq.com/v1/reverse.php?key=#{api_key}&lat=#{latitude}&lon=#{longitude}&format=json"
    uri = URI(location_iq_url)
    response = Net::HTTP.get(uri)
    parsed_json = JSON.parse(response)
    parsed_json
  end
end
