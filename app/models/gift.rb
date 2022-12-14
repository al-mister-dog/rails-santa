class Gift < ApplicationRecord
    belongs_to :participant, foreign_key: "participant_id"
end
