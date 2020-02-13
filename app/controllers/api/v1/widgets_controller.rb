class Api::V1::WidgetsController < ApplicationController

  def index
    if current_user
      render json: current_user.widgets
    else
      render json: nil
    end
  end
end
