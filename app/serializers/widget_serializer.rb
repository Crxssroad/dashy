class WidgetSerializer < ActiveModel::Serializer
  attributes :id, :modulable_type, :module

  def module
    object.modulable
  end
end
