class UpdateColumns < ActiveRecord::Migration[5.0]
  def change
  	change_column :medicines, :name, :string, :limit => 25, :null => false
  	change_column :medicines, :form, :string, :limit => 20, :null => false

  	change_column :atc_groups, :description, :text, :null => false

  	change_column :atc_sub_groups, :description, :text, :null => false

  	change_column :pharmacies, :name, :string, :limit => 25, :null => false
  	change_column :pharmacies, :address, :string, :limit => 40, :null => false
  	change_column :pharmacies, :phone, :string, :limit => 20, :null => false
  	change_column :pharmacies, :worktime, :string, :limit => 20, :null => false
  	change_column :pharmacies, :area, :string, :limit => 25, :null => false
  	remove_column :pharmacies, :type

  	change_column :price_lists, :price, :integer, :null => false
  	change_column :price_lists, :count, :integer, :null => false

  	change_column :users, :name, :string, :limit => 25, :null => false
  	change_column :users, :email, :string, :limit => 25, :null => false
  	change_column :users, :phone, :string, :limit => 15, :null => false
  end
end
