class RssFeedSerializer < ActiveModel::Serializer
  attributes :id, :url, :data
end
