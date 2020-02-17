require 'rails_helper'

RSpec.describe RssFeed, type: :model do
  it { should have_valid(:url).when("www.website.com/rss") }
  it { should_not have_valid(:url).when(nil, "") }
end
