class CreateAtcGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :atc_groups do |t|
      t.string :code, :limit => 1, :null => false
      t.text :description

      t.timestamps
    end
  end
end
