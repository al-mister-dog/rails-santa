class Participant < ApplicationRecord
    validates :email, uniqueness: true
    has_many :santas, foreign_key: "giver_id"
    has_many :gifts, foreign_key: "participant_id"
    # has_many :receivers, through: :santas, source: :receiver
    # has_many :givers, through: :santas, source: :giver
    # the above line two lines might not be necessary
    has_many :draws, through: :santas, source: :draw
end
