class AddPurchasedToGift < ActiveRecord::Migration[7.0]
  def change
    add_column :gifts, :purchased, :boolean
  end
end
