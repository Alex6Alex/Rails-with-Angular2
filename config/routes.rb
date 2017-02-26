Rails.application.routes.draw do

	resources :users
	resources :pharmacies
	resources :static_pages
	resources :groups, param: :code
	resources :sessions, only: [:new, :create, :destroy, :sign_state]
  scope path: "groups/:atc_group_id" do
  	resources :sub_groups, :path => '/', param: :code
  	scope path: '/:atc_sub_group_id' do
  		resources :medicines, :path => '/'
  	end
  end
  
	root 'application#index'

	match '/home', to: 'static_pages#home', via: 'get' 
	match '/signup', to: 'users#new', via: 'get'
	match '/signin', to: 'sessions#new', via: 'get'
	match '/signout', to: 'sessions#destroy', via: 'delete'
	match '/signstate', to: 'sessions#sign_state', via: 'post'
	match '/change_area', to: 'pharmacies#change_area', via: 'post'
	match '/search_pharms', to: 'pharmacies#search', via: 'get'

	#match '*path' => redirect('/'), via: :get
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
