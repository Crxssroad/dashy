class WeatherSettingSerializer < ActiveModel::Serializer
  attributes :id, :custom, :longitude, :latitude
end
