require 'rails_helper'

RSpec.describe Widget, type: :model do
  it { should have_valid(:position).when(0, 1, 2, 3) }
  it { should_not have_valid(:position).when(nil, "", "jane@doe.com") }
end
