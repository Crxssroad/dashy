require 'rails_helper'

RSpec.describe Api::V1::NotesController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:note) { Note.create(
      body: "Give me liberty or give me death",
      user: user
    ) }
  let!(:note2) { Note.create(
      body: "To be or not to be, that is not a properly formatted question",
      user: user
    ) }
  describe "GET#index" do
    
  end

  describe "GET#show" do

  end

  describe "POST#create" do

  end

  describe "PATCH#update" do

  end

  describe "DELETE#destroy" do
  end
end
