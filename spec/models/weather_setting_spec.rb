require 'rails_helper'

RSpec.describe Weather, type: :model do
  it { should have_valid(:custom).when(true, false) }
  it { should_not have_valid(:custom).when(nil, "", "some text", 1) }
end
