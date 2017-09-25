class PriceListsController < ApplicationController
  before_action :set_price, only:[:destroy]

  # POST /price_lists
  # POST /price_lists.json
  def create
    @medicine = Medicine.find(params[:price][:medicine_id])
    @pharmacy ||= Pharmacy.find_by(id: params[:price][:pharmacy_id])
    
    if @medicine && @pharmacy
      record_count = @medicine.priceLists.where(pharmacy_id: @pharmacy.id).count('id')
      puts record_count
      if record_count == 0
        @price = @medicine.priceLists.build(price_params)
      else
        respond_to do |format| 
          format.json { render json: { status: false } }
        end
        return
      end
    else 
      respond_to do |format| 
        format.json { render json: { status: false } }
      end
      return
    end

    respond_to do |format|
      if @price.save
        id = @price.id

        format.json { render json: { status: true, id: id } }
      else
        format.json { render json: { status: false, errors: @price.errors } }
      end
    end
  end

  def destroy
    @price.destroy if current_user.admin?
  end

  private
    def set_price
      @price = PriceList.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def price_params
      params.require(:price).permit(:medicine_id, :pharmacy_id, :price, :count)
    end

end
