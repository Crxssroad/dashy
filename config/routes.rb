Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/dash', to: 'homes#index'
  get '/stash', to: 'homes#index'
  get '/stash/journals', to: 'homes#index'
  get '/stash/journals/:id', to: 'homes#index'


  namespace 'api' do
    namespace 'v1' do
      resources :stashes, only: [:index]
      resources :journals, only: [:index, :show, :create, :update]
    end
  end
end
