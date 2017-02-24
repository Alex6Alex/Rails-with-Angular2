class AddAtcGroupIdToAtcSubGroups < ActiveRecord::Migration[5.0]
  def change
    add_column :atc_sub_groups, :atc_group_id, :integer
    remove_column :atc_sub_groups, :group
  end
end
