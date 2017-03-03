class CreatePriceLists < ActiveRecord::Migration[5.0]
  def change
    create_table :price_lists do |t|
      t.integer :medicine_id
      t.integer :pharmacy_id
      t.integer :price
      t.integer :count

      t.timestamps
    end
  end
end
