class Pharmacy < ApplicationRecord
  validates :name, presence: true, length: { maximum: 25 }
  validates :address, presence: true, length: { maximum: 40 }
  validates :area, presence: true, length: { maximum: 25 }
  validates :phone, presence: true, length: { maximum: 20 }
  validates :worktime, presence: true, length: { maximum: 20 }

  has_many :priceLists, dependent: :destroy
end
