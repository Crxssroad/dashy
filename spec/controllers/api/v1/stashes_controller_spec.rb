require 'rails_helper'

RSpec.describe Api::V1::StashesController, type: :controller do
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
    it "should return all the stashable items belonging to the user" do
      sign_in user
      get :index

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")

      expect(returned_json["journals"].length).to eq(2)

      expect(returned_json["journals"][0]["title"]).to eq("Red Pygmies")
      expect(returned_json["journals"][0]["description"]).to eq("Stories about the wonderous red pygmies")
      expect(returned_json["journals"][1]["title"]).to eq("Blue Pygmies")
      expect(returned_json["journals"][1]["description"]).to eq("Stories about the wonderous blue pygmies")
    end
  end
end
