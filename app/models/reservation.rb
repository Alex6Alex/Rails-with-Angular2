class Reservation < ApplicationRecord
	belongs_to :priceList, class_name: 'PriceList', foreign_key: :price_list_id
  belongs_to :user, class_name: 'User', foreign_key: :user_id
end
