class User < ApplicationRecord
  attr_writer :login
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :journals

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true
  validate :validate_username

  def validate_username
    if User.where(email: username).exists?
      errors.add(:username, :invalid)
    end
  end

  def login
   @login || self.username || self.email
  end

  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
      if conditions[:username].nil?
        where(conditions).first
      else
        where(username: conditions[:username]).first
      end
    end
  end
end
