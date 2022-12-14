class Participant < ApplicationRecord
    has_many :santas, foreign_key: "giver_id"
    has_many :gifts, foreign_key: "participant_id"
    has_many :receivers, through: :santas, source: :receiver
    has_many :givers, through: :santas, source: :giver
    has_many :draws, through: :santas, source: :draw
end
