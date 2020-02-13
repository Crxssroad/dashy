class Widget < ApplicationRecord
  belongs_to :modulable, :polymorphic => true
  belongs_to :user

  validates :position, presence: true, numericality: { only_integer: true }
end
