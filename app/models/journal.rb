class Journal < ApplicationRecord
  belongs_to :user
  has_many :entries
  has_many :widgets, :as => :modulable

  validates :title, presence: true
end
