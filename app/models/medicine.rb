class Medicine < ApplicationRecord
	has_many :priceLists, dependent: :destroy
	belongs_to :atcSubGroup
end
