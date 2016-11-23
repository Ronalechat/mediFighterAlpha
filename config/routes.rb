Rails.application.routes.draw do
  resources :sessions, only: [:new, :create, :destroy]

  root :to => 'pages#index'

  resources :users
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'


  # mount ActionCable.server => '/cable'
end
