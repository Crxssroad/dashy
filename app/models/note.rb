class Note < ApplicationRecord
 belongs_to :user
 has_many :widgets, :as => :modulable
 
end
