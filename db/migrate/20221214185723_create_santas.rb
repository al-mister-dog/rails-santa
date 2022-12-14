class CreateSantas < ActiveRecord::Migration[7.0]
  def change
    create_table :santas do |t|

      t.timestamps
    end
  end
end
