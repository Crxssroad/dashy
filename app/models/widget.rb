class Widget < ApplicationRecord
  belongs_to :modulable, :polymorphic => true
  belongs_to :user

  validates :modulable_type, inclusion: { in: ['WeatherSetting', 'Journal', 'RssFeed', 'Note'], message: "Please choose a widget type!" }
  validates :position, presence: true, numericality: { only_integer: true }
end
