Rails.application.routes.draw do
  root to: 'dashboard#index'

  namespace :api do
    resources :sales, only: [:index, :create, :destroy, :update]
  end
end
