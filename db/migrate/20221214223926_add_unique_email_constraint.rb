class AddUniqueEmailConstraint < ActiveRecord::Migration[7.0]
  def change
    add_index :participants, :email, unique: true
  end
end
