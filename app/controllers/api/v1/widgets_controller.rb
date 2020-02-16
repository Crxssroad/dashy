class Api::V1::WidgetsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user
      render json: current_user.widgets
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
    widget = Widget.find(params[:id])
    widget.destroy
    if widget.destroyed?
      render json: widget
    end
  end

  def widget_params
    params.require(:widget).permit(:position, :modulable_type, :modulable_id)
  end
end
