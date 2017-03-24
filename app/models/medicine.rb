class Medicine < ApplicationRecord
	alias_attribute :pack, :package

	validates :name, presence: true, length: { maximum: 25 }, 
			uniqueness: { case_sensitive: false }
	validates :form, presence: true, length: { maximum: 20 }
	validates :atc_sub_group_id, presence: true

	has_many :priceLists, dependent: :destroy
	belongs_to :atcSubGroup, class_name: 'AtcSubGroup', foreign_key: :atc_sub_group_id
end
