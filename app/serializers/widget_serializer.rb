class WidgetSerializer < ActiveModel::Serializer
  attributes :id, :position
  belongs_to :modulable, :polymorphic => true

  def module
    object.modulable
  end
end
