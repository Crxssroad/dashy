class Weather < ApplicationRecord
  validates :longitude, presence: true
  validates :latitude, presence: true
  validates :data, presence: true
  validates :location, presence: true
end
