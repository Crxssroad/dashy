class Api::V1::JournalsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: current_user.journals
  end

  def show
    render json: Journal.find(params[:id])
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

  def update
    journal = Journal.find(params[:id])
    journal.assign_attributes(journal_params)

    if journal.save
      render json: journal
    else
      render json: journal.errors.full_messages
    end
  end

  def destroy
    journal = Journal.find(params[:id])
    journal.destroy
  end

  private

  def journal_params
    params.require(:journal).permit(:title, :description)
  end
end
