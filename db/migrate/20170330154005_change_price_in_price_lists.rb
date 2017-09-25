class ChangePriceInPriceLists < ActiveRecord::Migration[5.0]
  def change
    change_column :price_lists, :price, :decimal, precision: 8, scale: 2, null: false
  end
end
