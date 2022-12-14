class AddColumnToDraw < ActiveRecord::Migration[7.0]
  def change
    add_column :draws, :organizer_id, :string
  end
end
