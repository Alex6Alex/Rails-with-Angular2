class PriceList < ApplicationRecord
	belongs_to :medicine
	belongs_to :pharmacy
end
