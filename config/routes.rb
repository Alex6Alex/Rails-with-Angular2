Rails.application.routes.draw do
  resources :reservations
  resources :users
  resources :pharmacies
  resources :static_pages
  resources :groups, param: :code
  resources :sessions, only: %i[new create destroy sign_state]
  resources :medicines
  resources :price_lists
  resources :reservations
  scope path: 'groups/:atc_group_id' do
    resources :sub_groups, path: '/', param: :code
  end

  root 'application#index'
  match '/home', to: 'static_pages#home', via: 'get'
  match '/signup', to: 'users#new', via: 'get'
  match '/signin', to: 'sessions#new', via: 'get'
  match '/signout', to: 'sessions#destroy', via: 'delete'
  match '/signstate', to: 'sessions#sign_state', via: 'post'
  match '/change_area', to: 'pharmacies#change_area', via: 'post'
  match '/search_pharms', to: 'pharmacies#search', via: 'get'
  match '/ordering', to: 'medicines#order', via: 'post'
  match '/search_medicines', to: 'groups#search', via: 'get'
  match '/medicine_in_pharmacy', to: 'medicines#search', via: 'get'
  match '/user_reservations', to: 'reservations#index', via: 'post'
end
