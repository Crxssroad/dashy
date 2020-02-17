class WeatherSetting < ApplicationRecord
  has_many :widgets, :as => :modulable

  validates :url, presence: true
end
