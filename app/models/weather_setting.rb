class WeatherSetting < ApplicationRecord
  has_many :widgets, :as => :modulable

  validates :custom, inclusion: { in: [true, false] }
end
