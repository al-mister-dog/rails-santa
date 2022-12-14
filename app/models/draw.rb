class Draw < ApplicationRecord
end
class Draw < ApplicationRecord
    has_many :santas
    has_many :participants, through: :santas, :source => :giver
end
#ActiveRecord::HasManyThroughSourceAssociationNotFoundError (Could not find the source association(s) "participant" or :participants in model Santa. Try 'has_many :participants, :through => :santas, :source => <name>'. Is it one of draw, giver, or receiver?):