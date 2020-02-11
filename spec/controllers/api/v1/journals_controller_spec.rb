require 'rails_helper'

RSpec.describe Api::V1::JournalsController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:journal1) { Journal.create(
      title: "Red Pygmies",
      description: "Stories about the wonderous red pygmies",
      user: user
    ) }

  let!(:journal2) { Journal.create(
      title: "Blue Pygmies",
      description: "Stories about the wonderous blue pygmies",
      user: user
    ) }

  describe "GET#index" do
    it "should return all the journals belonging to the user" do
      sign_in user
      get :index

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq(2)

      expect(returned_json[0]["title"]).to eq("Red Pygmies")
      expect(returned_json[0]["description"]).to eq("Stories about the wonderous red pygmies")
      expect(returned_json[1]["title"]).to eq("Blue Pygmies")
      expect(returned_json[1]["description"]).to eq("Stories about the wonderous blue pygmies")
    end
  end

  describe "GET#show" do
    it "should return the requested journal" do
      sign_in user
      get :show, params: { id: journal1.id }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")

      expect(returned_json["title"]).to eq(journal1.title)
      expect(returned_json["description"]).to eq(journal1.description)
    end
  end

  describe "POST#create" do
    let!(:good_post) {
      {
        journal: {
          title: "Making this long just in case",
          description: "And this is optional"
        }
      }
    }
    let!(:bad_post) {
      {
        journal: {
          description: "Oh no it's missing a title"
        }
      }
    }
    context "succesful post" do
      it "should persist in the database" do
        sign_in user
        previous_count = user.journals.length
        post :create, params: good_post
        user.reload
        next_count = user.journals.length

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(next_count).to eq(previous_count + 1)
      end

      it "should return the newly created journal" do
        sign_in user
        post :create, params: good_post
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(returned_json["title"]).to eq("Making this long just in case")
        expect(returned_json["description"]).to eq("And this is optional")
      end
    end

    context "unsuccesful post" do
      it "should not persist in the databse" do
        sign_in user
        previous_count = user.journals.length
        post :create, params: bad_post
        user.reload
        next_count = user.journals.length

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(next_count).to eq(previous_count)
      end

      it "should return errors" do
        sign_in user
        post :create, params: bad_post
        returned_json = JSON.parse(response.body)

        expect(returned_json.include?("Title can't be blank")).to be true
      end
    end
  end

  describe "PATCH#update" do
    let!(:good_patch) {
      {
        journal: {
          title: "And now this title has changed",
          description: "Still optional"
        },
        id: journal1.id
      }
    }
    let!(:bad_patch) {
      {
        journal: {
          title: "",
          description: "Oh no it's missing a title, again, because we removed it"
        },
        id: journal1.id
      }
    }
    context "succesful patch" do
      it "should return the updated journal" do
        sign_in user
        put :update, params: good_patch
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(returned_json["title"]).to eq("And now this title has changed")
        expect(returned_json["description"]).to eq("Still optional")
      end
    end

    context "unsuccesful patch" do
      it "should return errors" do
        sign_in user
        put :update, params: bad_patch
        returned_json = JSON.parse(response.body)

        expect(returned_json.include?("Title can't be blank")).to be true
      end
    end
  end

  describe "DELETE#destroy" do
    it "should remove the journal from the databse" do
      sign_in user
      previous_count = user.journals.length
      delete :destroy, params: { id: journal1.id }
      user.reload
      next_count = user.journals.length

      expect(next_count).to eq(previous_count - 1)
    end
  end
end
