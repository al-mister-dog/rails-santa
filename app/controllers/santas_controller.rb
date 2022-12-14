class SantasController < ApplicationController
  before_action :set_santa, only: %i[ show update destroy ]

  # GET /santas
  def index
    @santas = Santa.all
    render json: @santas
  end

  # GET /santas/1
  def show
    render json: @santa
  end

  # POST /santas
  def create
    body = JSON.parse(request.body.read)
    @santa = Santa.new(body)

    if @santa.save
      render json: @santa, status: :created, location: @santa
    else
      render json: @santa.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /santas/1
  def update
    body = JSON.parse(request.body.read)
    if @santa.update(body)
      render json: @santa
    else
      render json: @santa.errors, status: :unprocessable_entity
    end
  end

  # DELETE /santas/1
  def destroy
    @santa.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_santa
      @santa = Santa.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def santa_params
      params.fetch(:santa, {})
    end
end
