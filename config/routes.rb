Rails.application.routes.draw do
  resources :users
  resources :medicines
  resources :pharmacies
  resources :static_pages
  resources :sessions, only: [:new, :create, :destroy, :sign_state]
	#get '/home' => 'static_pages#home', defaults: {format: :json}

	root 'application#index'

	match '/home', to: 'static_pages#home', via: 'get' 
	match '/signup', to: 'users#new', via: 'get'
	match '/signin', to: 'sessions#new', via: 'get'
	match '/signout', to: 'sessions#destroy', via: 'delete'
	match '/signstate', to: 'sessions#sign_state', via: 'post'
	match '/change_area', to: 'pharmacies#change_area', via: 'post'

	match '*path' => redirect('/'), via: :get
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
