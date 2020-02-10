class Api::V1::StashesController < ApplicationController
  def index
    render json: {
      "journals" => current_user.journals
    }
  end
end
