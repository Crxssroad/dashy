class Widget < ApplicationRecord
  belongs_to :modulable, :polymorphic => true, optional: true
  belongs_to :user

  validates :modulable_type, inclusion: { in: ['Weather', 'Journal'], message: "Please choose a widget type!" }
  validates :position, presence: true, numericality: { only_integer: true }
end
