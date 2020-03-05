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
    it "should return all the notes belonging to the user" do
      sign_in user
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq(2)
      expect(returned_json[0]["body"]).to eq(note.body)
      expect(returned_json[1]["body"]).to eq(note2.body)
    end
  end

  describe "GET#show" do
    it "should return the requested note" do
      sign_in user
      get :show, params: { id: note.id }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")

      expect(returned_json["body"]).to eq(note.body)
    end
  end

  describe "POST#create" do
    let!(:good_post) {
      {
        note: {
          body: "It just goes to show you"
        }
      }
    }
    context "succesful post" do
      it "should return an empty note if no body is provided" do
        sign_in user
        post :create
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(returned_json["body"]).to eq("")
      end

      it "should return the newly created post" do
        sign_in user
        post :create, params: good_post
        returned_json = JSON.parse(response.body)

        expect(returned_json["body"]).to eq(good_post[:note][:body])
      end
    end
  end

  describe "PATCH#update" do

  end

  describe "DELETE#destroy" do
  end
end
