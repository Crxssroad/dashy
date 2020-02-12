class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :profilePhoto

  def profilePhoto
    object.profile_photo.url || "https://dashy-production.s3.amazonaws.com/defaults/default-user-profile-photo.png"
  end
end
