class PriceList < ApplicationRecord
	validates :medicine_id, presence: true
	validates :pharmacy_id, presence: true

	VALID_PRICE_REGEX = /\A\d+[.]?\d{2}\z/i
	VALID_COUNT_REGEX = /\A[0-9]+\z/i
	validates :price, presence: true, numericality: { greater_than: 0 }
	validates :count, presence: true, numericality: { only_integer: true, greater_than: 0 }

	has_many :reservations, dependent: :destroy

	belongs_to :medicine, class_name: 'Medicine', foreign_key: :medicine_id
	belongs_to :pharmacy, class_name: 'Pharmacy', foreign_key: :pharmacy_id
end
