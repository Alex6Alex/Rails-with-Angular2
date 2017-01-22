Rails.application.routes.draw do
  resources :users
  resources :medicines
  resources :pharmacies
	resources :static_pages
	#get '/home' => 'static_pages#home', defaults: {format: :json}

	root 'application#index'

	match '/home', to: 'static_pages#home', via: 'get' 
	match '/signup', to: 'users#new', via: 'get'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
