class AddDrawIdToSanta < ActiveRecord::Migration[7.0]
  def change
    add_column :santas, :draw_id, :integer
  end
end
