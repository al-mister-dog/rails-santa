class AddReceiverIdToSanta < ActiveRecord::Migration[7.0]
  def change
    add_column :santas, :receiver_id, :integer
  end
end
