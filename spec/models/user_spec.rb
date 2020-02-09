require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:username).when("JaneDoe") }
  it { should_not have_valid(:username).when(nil, "", "jane@doe.com") }
end
