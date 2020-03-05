class Api::V1::NotesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: current_user.notes
  end

  def show
    render json: Note.find(params[:id])
  end

  def create
    note = Note.new(body: "")
    if params[:note]
      note.assign_attributes(note_params)
    end
    note.user = current_user

    if note.save
      render json: note
    else
      render json: note.errors.full_messages
    end
  end

  def update
    note = Note.find(params[:id])
    note.assign_attributes(note_params)
    if note.save
      render json: note
    else
      render json: note.errors.full_messages
    end
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy

    if note.destroyed?
      note.widgets.destroy_all
      render json: note
    end
  end

  private

  def note_params
    params.require(:note).permit(:body)
  end
end
