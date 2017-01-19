class CreatePharmacies < ActiveRecord::Migration[5.0]
  def change
    create_table :pharmacies do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :worktime
      t.string :type

      t.timestamps
    end
  end
end
