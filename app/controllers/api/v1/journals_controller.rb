class Api::V1::JournalsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: current_user.journals
  end

  def create
    journal = Journal.new(journal_params)
    journal.user = current_user

    if journal.save
      render json: journal
    else
      render json: journal.errors.full_messages
    end
  end

  private

  def journal_params
    params.require(:journal).permit(:title, :description)
  end
end
