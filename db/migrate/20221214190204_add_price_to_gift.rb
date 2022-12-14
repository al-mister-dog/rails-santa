class AddPriceToGift < ActiveRecord::Migration[7.0]
  def change
    add_column :gifts, :price, :integer
  end
end
