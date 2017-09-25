class ChangePhoneLength < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :phone, :string, limit: 16, null: false
  end
end
