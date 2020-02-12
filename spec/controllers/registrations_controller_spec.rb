require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do
  describe "POST#create" do
    let!(:good_user) {
      {
        user: {
          username: "NickKung",
          email: "nick@nickel.com",
          password: "thatscute",
          password_confirmation: "thatscute"
        }
      }
    }
    let!(:bad_user) {
      {
        user: {
          username: "",
          email: "",
          password: "",
          password_confirmation: ""
        }
      }
    }
    context "succesful post" do
      it "should persist in the database" do
        request.env["devise.mapping"] = Devise.mappings[:user]
        previous_count = User.all.length
        post :create, params: good_user
        next_count = User.all.length

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(next_count).to eq(previous_count + 1)
      end

      it "should return the newly created user" do
        request.env["devise.mapping"] = Devise.mappings[:user]
        post :create, params: good_user
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(returned_json["username"]).to eq("NickKung")
        expect(returned_json["email"]).to eq("nick@nickel.com")
      end
    end

    context "unsuccesful post" do
      it "should not persist in the databse" do
        request.env["devise.mapping"] = Devise.mappings[:user]
        previous_count = User.all.length
        post :create, params: bad_user
        next_count = User.all.length

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(next_count).to eq(previous_count)
      end

      it "should return errors" do
        request.env["devise.mapping"] = Devise.mappings[:user]
        post :create, params: bad_user
        returned_json = JSON.parse(response.body)

        expect(returned_json.include?("Username can't be blank")).to be true
        expect(returned_json.include?("Email can't be blank")).to be true
        expect(returned_json.include?("Password can't be blank")).to be true
      end
    end
  end
end
