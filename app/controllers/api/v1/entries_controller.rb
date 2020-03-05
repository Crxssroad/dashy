class Api::V1::EntriesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    journal = Journal.find_by(id: params[:journal_id])
    entry = Entry.new(entry_params)
    if entry_params[:title] == ""
      entry.title = "Untitled"
    end
    entry.journal = journal

    if entry.save
      render json: entry
    else
      render json: entry.errors.full_messages
    end
  end

  def update
    entry = Entry.find(params[:id])
    entry.assign_attributes(entry_params)

    if entry.save
      render json: entry
    else
      render json: entry.errors.full_messages
    end
  end

  def destroy
    entry = Entry.find(params[:id])
    entry.destroy
    render json: entry
  end

  private

  def entry_params
    params.require(:entry).permit(:title, :body)
  end
end
