class CreateMedicines < ActiveRecord::Migration[5.0]
  def change
    create_table :medicines do |t|
      t.string :name
      t.string :classification
      t.string :form
      t.string :package
      t.string :comment

      t.timestamps
    end
  end
end
