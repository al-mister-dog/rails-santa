class AddColumnToGift < ActiveRecord::Migration[7.0]
  def change
    add_column :gifts, :name, :string
  end
end
