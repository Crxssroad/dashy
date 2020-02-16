require 'rails_helper'

RSpec.describe Weather, type: :model do
  it { should have_valid(:latitude).when(-82) }
  it { should_not have_valid(:latitude).when(nil, "") }

  it { should have_valid(:longitude).when(20.345) }
  it { should_not have_valid(:longitude).when(nil, "") }

  it { should have_valid(:data).when("weather") }
  it { should_not have_valid(:data).when(nil, "") }

  it { should have_valid(:location).when("location") }
  it { should_not have_valid(:location).when(nil, "") }
end
