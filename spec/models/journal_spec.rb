require 'rails_helper'

RSpec.describe Journal, type: :model do
  it { should have_valid(:title).when("Characters") }
  it { should_not have_valid(:title).when(nil, "") }

  it { should_not have_valid(:description).when("Lorem ipsum dolor sit amet, consectetuer adipiscing") }
end
