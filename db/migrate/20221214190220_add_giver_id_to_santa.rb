class AddGiverIdToSanta < ActiveRecord::Migration[7.0]
  def change
    add_column :santas, :giver_id, :integer
  end
end
