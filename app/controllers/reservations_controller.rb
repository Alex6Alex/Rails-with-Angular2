class ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :edit, :update, :destroy]

  # POST /user_reservations
  # POSt /user_reservations.json
  def index
    # @reservations = Reservation.where(user_id: params[:id])
    sql = "SELECT reservations.id, price_lists.price, 
           medicines.id AS med_id, medicines.name AS medicine,
           pharmacies.id AS pharm_id, pharmacies.name AS pharmacy, 
           pharmacies.address AS address, reservations.created_at
           FROM reservations, price_lists, medicines, pharmacies 
           WHERE price_lists.id = reservations.price_list_id 
           AND medicines.id = price_lists.medicine_id
           AND pharmacies.id = price_lists.pharmacy_id 
           AND reservations.user_id = #{params[:id]}
           ORDER BY reservations.created_at DESC"
    @reservations = ActiveRecord::Base.connection.execute(sql)
    respond_to do |format|
      format.json { render json: @reservations.to_json() }
    end
  end

  # GET /reservations/1
  # GET /reservations/1.json
  def show
  end

  # GET /reservations/new
  def new
    @reservation = Reservation.new
  end

  # GET /reservations/1/edit
  def edit
  end

  # POST /reservations
  # POST /reservations.json
  def create
    if !current_user.nil?
      @reservation = current_user.reservations.build(reservation_params)

      respond_to do |format|
        if @reservation.save
          priceList = PriceList.select(:count).find(@reservation.price_list_id)
          PriceList.where(id: @reservation.price_list_id).update_all(count: priceList.count - 1)

          format.json { render json: { status: true } }
        else
          format.json { render json: { status: false, errors: @reservation.errors } }
        end
      end
    end
  end

  # PATCH/PUT /reservations/1
  # PATCH/PUT /reservations/1.json
  def update
    respond_to do |format|
      if @reservation.update(reservation_params)
        format.html { redirect_to @reservation, notice: 'Reservation was successfully updated.' }
        format.json { render :show, status: :ok, location: @reservation }
      else
        format.html { render :edit }
        format.json { render json: @reservation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reservations/1
  # DELETE /reservations/1.json
  def destroy
    @reservation.destroy
    respond_to do |format|
      format.html { redirect_to reservations_url, notice: 'Reservation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      @reservation = Reservation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def reservation_params
      params.require(:reservation).permit(:user_id, :price_list_id)
    end
end
