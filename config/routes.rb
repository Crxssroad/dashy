Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'},
    path_names: { sign_in: 'sign-in', sign_up: 'sign-up'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  authenticate :user do
    get '/dash', to: 'homes#index'
    get '/stash', to: 'homes#index'
    get '/stash/journals', to: 'homes#index'
    get '/stash/journals/:id', to: 'homes#index'
  end

  namespace 'api' do
    namespace 'v1' do
      resources :stashes, only: [:index]
      resources :journals, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
