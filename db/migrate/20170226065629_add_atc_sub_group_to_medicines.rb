class AddAtcSubGroupToMedicines < ActiveRecord::Migration[5.0]
  def change
  	add_column :medicines, :atc_sub_group_id, :integer
  	remove_column :medicines, :classification
  	change_column :medicines, :comment, :text
  end
end
