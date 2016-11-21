Rails.application.routes.draw do
  get 'users/new'

  get 'users/edit'

  get 'users/show'

  resources :sessions, only: [:new, :create]

  root :to => 'pages#index'
  

  # mount ActionCable.server => '/cable'
end
