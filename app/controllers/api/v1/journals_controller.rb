class Api::V1::JournalsController < ApplicationController
  def index
    render json: current_user.journals
  end
end
