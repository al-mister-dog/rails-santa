class DrawsController < ApplicationController
  before_action :set_draw, only: %i[ show update destroy ]

  # GET /draws
  def index
    @draws = Draw.all
    render json: @draws, status: :ok
  end

  # GET /draws/1
  def show
    participants = @draw.participants #SELECT "participants".* FROM "participants" INNER JOIN "santas" ON "participants"."id" = "santas"."giver_id" WHERE "santas"."draw_id" = ?  [["draw_id", "7"]]
    render json: {draw: @draw, participants: participants}, status: :ok
  end

  # POST /draws
  def create
    body = JSON.parse(request.body.read)
    
    participants = body["participants"] 
    santas = body["santas"]
    budget = body["budget"]
    
    draw = Draw.create(budget: budget)
    organizer_id = participants[0]["email"]
    draw.update(organizer_id: organizer_id)
    
    santas.each do |santa|
      giver = Participant.find_by(email: santa["giver_id"])
      receiver = Participant.find_by(email: santa["receiver_id"])
      
      if giver.nil?
        giver = Participant.create(email: santa["giver_id"])
      end

      if receiver.nil?
        receiver = Participant.create(email: santa["receiver_id"])
      end

      Santa.create(giver_id: giver.id, receiver_id: receiver.id, draw_id: draw.id)
    end

    render json: { draw: draw }, status: :created
  end

  # PATCH/PUT /draws/1
  def update
    body = JSON.parse(request.body.read)
    participants = body["participants"] 
    santas = body["santas"]
    budget = body["budget"]
    
    @draw.update(budget: budget)
    
    santas.each do |santa|
      giver = Participant.find_by(email: santa["giver_id"])
      receiver = Participant.find_by(email: santa["receiver_id"])
      
      if giver.nil?
        giver = Participant.create(email: santa["giver_id"])
      end

      if receiver.nil?
        receiver = Participant.create(email: santa["receiver_id"])
      end

      santa = Santa.find_by(giver_id: giver.id, draw_id: @draw.id)
      if santa.nil?
        santa = Santa.create(giver_id: giver.id, receiver_id: receiver.id, draw_id: @draw.id)
      else
        santa.update(receiver_id: receiver.id)
      end
      
    end

    santas_by_draw = Santa.where(draw_id: @draw.id)
    participants_by_draw = @draw.participants

    santas_to_delete = santas_by_draw.select do |santa|
      !santas.any? do |s| 
        s["giver_id"] == santa.giver.email 
      end
    end
    
    santas_to_delete.each do |santa|
      santa.destroy
    end

    participants_to_delete = participants_by_draw.select do |participant|
      !santas.any? do |s|
        s["giver_id"] == participant.email
      end
    end

    participants_to_delete.each do |participant|
      participant.draws.delete(@draw)
    end

    render json: { draw: @draw }, status: :ok
  end

  # DELETE /draws/1
  def destroy
    @draw.destroy
  end

  def draws_by_participant
    participant = Participant.find_by(id: params[:participant_id])    
    draws = participant.draws
    render json: draws, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_draw
      @draw = Draw.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def draw_params
      params.fetch(:draw, {})
    end
end