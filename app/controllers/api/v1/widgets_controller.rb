class Api::V1::WidgetsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user
      render json: current_user.widgets.order(:position)
    else
      render json: nil
    end
  end

  def create
    widget = Widget.new(widget_params)
    widget.user = current_user
    if widget.save
      render json: widget
    else
      render json: widget.errors.full_messages
    end
  end

  def destroy
    optional_settings_widgets = ["WeatherSetting"]
    widget = Widget.find(params[:id])
    if optional_settings_widgets.include?(widget.modulable.class.name)
      widget.modulable.destroy
    end
    widget.destroy
    if widget.destroyed?
      render json: widget
    end
  end

  def reorder
    dragged = Widget.find_by(position:  params[:dragIndex])
    dragged.position = params[:hoverIndex]
    hovered = Widget.find_by(position:  params[:hoverIndex])
    hovered.position = params[:dragIndex]
    if dragged.save && hovered.save
      render json: true
    else
      render json: false
    end
  end

  def widget_params
    params.require(:widget).permit(:position, :modulable_type, :modulable_id, :old_position, :new_position)
  end
end
