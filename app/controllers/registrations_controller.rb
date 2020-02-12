class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    user = User.new(user_params)

    if user.save
      sign_in user
      render json: user
    else
      render json: user.errors.full_messages
    end
  end

  private

  def user_params
    params.require(:user).permit(
    :username,
    :email,
    :password,
    :password_confirmation,
    :remember_me
  )
  end
end
