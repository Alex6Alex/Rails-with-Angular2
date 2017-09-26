class AtcSubGroup < ApplicationRecord
	validates :code, presence: true, length: { maximum: 3 }, uniqueness: { case_sensitive: false }
  validates :description, presence: true, length: { minimum: 5 }

  belongs_to :atcGroup, class_name: 'AtcGroup', foreign_key: :atc_group_id
  has_many :medicines, dependent: :destroy
end
