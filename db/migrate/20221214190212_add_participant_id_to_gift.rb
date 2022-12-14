class AddParticipantIdToGift < ActiveRecord::Migration[7.0]
  def change
    add_column :gifts, :participant_id, :integer
  end
end
