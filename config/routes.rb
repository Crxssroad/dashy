Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'},
    path_names: { sign_in: 'login', sign_up: 'signup', sign_out: 'logout'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/welcome', to: 'homes#index'

  authenticate :user do
    get '/dash', to: 'homes#index'
    get '/stash', to: 'homes#index'
    get '/stash/journals', to: 'homes#index'
    get '/stash/journals/:id', to: 'homes#index'
    get '/stash/journals/:journal_id/entries/:id', to: 'homes#index'
  end

  namespace 'api' do
    namespace 'v1' do
      resources :stashes, only: [:index]
      resources :journals, only: [:index, :show, :create, :update, :destroy] do
        resources :entries, only: [:create, :update, :destroy]
      end
      get '/users/current'
      resources :widgets, only: [:index, :create, :destroy]
      patch '/widgets/reorder'
      resources :weathers, only: [:create]
      resources :weather_settings, only: [:create]
      resources :rss_feeds, only: [:create]
      resources :notes, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
