class JournalSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :created_at, :updated_at, :entries
end
