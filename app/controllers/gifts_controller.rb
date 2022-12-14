class GiftsController < ApplicationController
  before_action :set_gift, only: %i[ show update destroy ]

  # GET /gifts
  def index
    @gifts = Gift.all
    render json: @gifts
  end

  # GET /gifts/1
  def show
    render json: @gift
  end

  # POST /gifts
  def create
    body = JSON.parse(request.body.read)
    
    @gift = Gift.new(name: body["name"], price: body["price"], purchased: body["purchased"], participant_id: body["participant_id"])
    wishlist = Gift.where(participant_id: body["participant_id"])
    if @gift.save
      render json: {gift: @gift, wishlist: wishlist}, status: :created, location: @gift
    else
      render json: @gift.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /gifts/1
  def update
    body = JSON.parse(request.body.read)
    
    if @gift.update(purchased: body["purchased"])
      wishlist = Gift.where(participant_id: body["receiver_id"])
      render json: {gift: @gift, wishlist: wishlist}, status: :ok
    else
      render json: @gift.errors, status: :unprocessable_entity
    end
  end

  # DELETE /gifts/1
  def destroy
    participant_id = @gift.participant_id
    @gift.destroy
    gifts = Gift.where(participant_id: participant_id)
    render json: gifts, status: :ok
  end

  # GET /gifts/wishlist
  def wishlist_items
    @wishlist_items = Gift.where(participant_id: params[:participant_id])
    render json: @wishlist_items, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gift
      @gift = Gift.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def gift_params
      params.fetch(:gift, {})
    end
end
