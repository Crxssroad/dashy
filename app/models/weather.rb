class Weather < ApplicationRecord
  has_many :widgets, :as => :modulable

  validates :longitude, presence: true
  validates :latitude, presence: true
end
