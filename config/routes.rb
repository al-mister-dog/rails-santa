Rails.application.routes.draw do
  resources :gifts
  resources :santas
  resources :draws
  resources :participants
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get "/gifts-wishlist/:participant_id", to: "gifts#wishlist_items"
  get "/draws-by-participant/:participant_id", to: "draws#draws_by_participant"
  get "/participant-and-santa/:participant_id", to: "participants#participant_and_santa"
end
