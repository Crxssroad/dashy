class Api::V1::WeatherSettingsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    weather_setting = WeatherSetting.new(weather_settings_params)

    if weather_setting.save
      render json: weather_setting
    else
      render json: weather_setting.errors.full_messages
    end
  end

  def weather_settings_params
    params.require(:weather_setting).permit(:latitude, :longitude, :custom)
  end
end
