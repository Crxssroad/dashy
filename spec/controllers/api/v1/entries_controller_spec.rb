require 'rails_helper'

RSpec.describe Api::V1::EntriesController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:journal) { Journal.create(
      title: "Red Pygmies",
      description: "Stories about the wonderous red pygmies",
      user: user
    ) }

  let!(:entry) { Entry.create(
      title: "An unexpected visitor",
      body: "No one expected to see blue that day...",
      journal: journal
    )}

  describe "POST#create" do
    let!(:good_post) {
      {
        entry: {
          title: "Mikaelhausen goes on vacation",
          body: "It all started a couple of weeks ago when, Mikaelhausen, leader of the red pygmies...",
        },
        journal_id: journal.id
      }
    }
    let!(:good_post2) {
      {
        entry: {
          title: "",
          body: "",
        },
        journal_id: journal.id
      }
    }
    let!(:bad_post) {
      {
        entry: {
          title: "Disaster in the village!",
          body: "With their fearless leader gone...",
        },
        journal_id: 0
      }
    }

    context "succesful post" do
      it "should persist in the database" do
        previous_count = journal.entries.length
        post :create, params: good_post
        journal.reload
        next_count = journal.entries.length

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(next_count).to eq(previous_count + 1)
      end

      it "should return the newly created entry" do
        post :create, params: good_post
        returned_json = JSON.parse(response.body)

        expect(returned_json["title"]).to eq("Mikaelhausen goes on vacation")
        expect(returned_json["body"]).to eq("It all started a couple of weeks ago when, Mikaelhausen, leader of the red pygmies...")
      end

      it "should return an entry with a title of 'untitled' if no title is provided" do
        post :create, params: good_post2
        returned_json = JSON.parse(response.body)

        expect(returned_json["title"]).to eq("Untitled")
      end
    end

    context "unsuccesful post" do
      it "should not persist in the databse" do
        previous_count = journal.entries.length
        post :create, params: bad_post
        journal.reload
        next_count = journal.entries.length

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(next_count).to eq(previous_count)
      end

      it "should return errors" do
        post :create, params: bad_post
        returned_json = JSON.parse(response.body)

        expect(returned_json.include?("Journal must exist")).to be true
      end
    end
  end

  describe "PATCH#update" do

    context "succesful patch" do
      let!(:good_patch) {
        {
          entry: {
            title: "Mikaelhausen goes on vacation",
            body: "It all started a couple of weeks ago when, Mikaelhausen, leader of the red pygmies...",
          },
          journal_id: journal.id,
          id: entry.id
        }
      }
      it "should return the newly updated entry" do
        patch :update, params: good_patch
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")

        expect(returned_json["title"]).to eq(good_patch[:entry][:title])
        expect(returned_json["body"]).to eq(good_patch[:entry][:body])
      end
    end

    context "unsuccesful patch" do

    end
  end

  describe "DELETE#destroy" do
    context "succesful delete" do

    end

    context "unsuccesful delete" do

    end
  end
end
