class Api::V1::UsersController < ApplicationController

  def current
    render json: current_user, serializer: UserSerializer
  end
end
