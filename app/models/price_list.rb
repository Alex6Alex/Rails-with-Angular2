class PriceList < ApplicationRecord
	validates :medicine_id, presence: true
	validates :pharmacy_id, presence: true
	validates :price, presence: true
	validates :count, presence: true

	belongs_to :medicine, class_name: 'Medicine', foreign_key: :medicine_id
	belongs_to :pharmacy, class_name: 'Pharmacy', foreign_key: :pharmacy_id
end
