class PharmaciesController < ApplicationController
  before_action :set_pharmacy, only: [:show, :edit, :update, :destroy]

  # GET /pharmacies
  # GET /pharmacies.json
  def index
    #Pharmacy.where(area: nil).destroy_all
    @pharmacies = Pharmacy.all
    respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render :json => @pharmacies.to_json() }
    end
  end

  def change_area
    area ||= params[:area]
    case area
    when 0
      @pharmacies = Pharmacy.all
    when 1
      @pharmacies = Pharmacy.where(area: "Гагаринский")
    when 2
      @pharmacies = Pharmacy.where(area: "Ленинский")
    when 3
      @pharmacies = Pharmacy.where(area: "Нахимовский")
    when 4
      @pharmacies = Pharmacy.where(area: "Балаклавский")
    end
    respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render :json => @pharmacies.to_json() }
    end
  end

  # GET /pharmacies/1
  # GET /pharmacies/1.json
  def show
  end

  # GET /pharmacies/new
  def new
    @pharmacy = Pharmacy.new
  end

  # GET /pharmacies/1/edit
  def edit
  end

  # POST /pharmacies
  # POST /pharmacies.json
  def create
    @pharmacy = Pharmacy.new(pharmacy_params)

    respond_to do |format|
      if @pharmacy.save
        format.html { redirect_to @pharmacy, notice: 'Pharmacy was successfully created.' }
        format.json { render :show, status: :created, location: @pharmacy }
      else
        format.html { render :new }
        format.json { render json: @pharmacy.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pharmacies/1
  # PATCH/PUT /pharmacies/1.json
  def update
    respond_to do |format|
      if @pharmacy.update(pharmacy_params)
        format.html { redirect_to @pharmacy, notice: 'Pharmacy was successfully updated.' }
        format.json { render :show, status: :ok, location: @pharmacy }
      else
        format.html { render :edit }
        format.json { render json: @pharmacy.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pharmacies/1
  # DELETE /pharmacies/1.json
  def destroy
    @pharmacy.destroy
    respond_to do |format|
      format.html { redirect_to pharmacies_url, notice: 'Pharmacy was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pharmacy
      @pharmacy = Pharmacy.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pharmacy_params
      params.require(:pharmacy).permit(:name, :address, :phone, :worktime, :type)
    end
end
