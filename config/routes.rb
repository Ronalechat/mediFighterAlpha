Rails.application.routes.draw do
  resources :sessions, only: [:new, :create, :destroy]



  resources :users
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'


  root :to => 'welcome#index'
  mount ActionCable.server => '/cable'
end
