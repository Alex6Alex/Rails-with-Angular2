class AtcGroup < ApplicationRecord
	validates :code, presence: true, uniqueness: { case_sensitive: false }
  has_many :atcSubGroups, -> { order(code: :asc) }, dependent: :destroy
end
