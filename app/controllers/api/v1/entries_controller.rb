class Api::V1::EntriesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    binding.pry
    render json: Entry.find(params[:id])
  end

  def create
    journal = Journal.find(params[:journal_id])
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
    binding.pry
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

    if entry.destroyed?
      entry.widgets.destroy_all
    end
  end

  private

  def entry_params
    params.require(:entry).permit(:title, :body)
  end
end
