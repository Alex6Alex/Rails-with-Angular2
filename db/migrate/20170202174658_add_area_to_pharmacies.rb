class AddAreaToPharmacies < ActiveRecord::Migration[5.0]
  def change
    add_column :pharmacies, :area, :string
  end
end
