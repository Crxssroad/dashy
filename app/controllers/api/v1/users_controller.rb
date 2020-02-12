class Api::V1::UsersController < ApplicationController

  def current
    if current_user
      render json: current_user, serializer: UserSerializer
    else
      render json: nil
    end
  end
end
