class CreateAtcSubGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :atc_sub_groups do |t|
      t.string :code, limit: 3, null: false
      t.text :description
      t.integer :group

      t.timestamps
    end
  end
end
