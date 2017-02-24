class PharmaciesController < ApplicationController
  before_action :set_pharmacy, only: [:show, :edit, :update, :destroy]

  # GET /pharmacies
  # GET /pharmacies.json
  def index
    #Pharmacy.where(area: nil).destroy_all
    @pharmacies = Pharmacy.select(:id, :name, :address, :phone, :worktime)
      .order(:name)
    respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render :json => @pharmacies.to_json() }
    end
  end

  def change_area
    area = params[:area]
    order = params[:order]
    time = params[:time]
    if area == 'Все'
      if time == 'all'
        @pharmacies = Pharmacy.select(:id, :name, :address, :phone, :worktime)
          .where('LOWER(name) LIKE LOWER(:param_name)', 
          { :param_name => "%#{params[:name]}%" })
          .order(order)
      else
        if time == 'day'
          @pharmacies = Pharmacy.select(:id, :name, :address, :phone, :worktime)
            .where('LOWER(name) LIKE LOWER(:param_name)', 
            { :param_name => "%#{params[:name]}%" })
            .where.not(worktime: 'круглосуточно')
            .order(order)
        else
          if time == 'allday'
            @pharmacies = Pharmacy.select(:id, :name, :address, :phone, :worktime)
              .where('LOWER(name) LIKE LOWER(:param_name)', 
              { :param_name => "%#{params[:name]}%" })
              .where(worktime: 'круглосуточно')
              .order(order)
          end
        end
      end
    else
      if time == 'all'
        @pharmacies = Pharmacy.select(:id, :name, :address, :phone, :worktime)
          .where('LOWER(name) LIKE LOWER(:param_name)', 
          { :param_name => "%#{params[:name]}%" })
          .where(area: area)
          .order(order)
      else
        if time == 'day'
          @pharmacies = Pharmacy.select(:id, :name, :address, :phone, :worktime)
            .where('LOWER(name) LIKE LOWER(:param_name)', 
            { :param_name => "%#{params[:name]}%" })
            .where(area: area)
            .where.not(worktime: 'круглосуточно')
            .order(order)
        else
          if time == 'allday'
            @pharmacies = Pharmacy.select(:id, :name, :address, :phone, :worktime)
              .where('LOWER(name) LIKE LOWER(:param_name)', 
              { :param_name => "%#{params[:name]}%" })
              .where(area: area, worktime: 'круглосуточно')
              .order(order)
          end
        end
      end
    end
    respond_to do |format|
      #format.html { render 'layouts/application' }
      format.json { render :json => @pharmacies.to_json() }
    end
  end

  def search
    respond_to do |format|
      #format.html { render 'layouts/application' }
      if !params[:search].blank?
        @searchedPharmacies = Pharmacy.select(:id, :name, :address)
          .where('LOWER(name) LIKE LOWER(:param_name)', 
          { :param_name => "%#{params[:search]}%" })
      else
        @searchedPharmacies = nil
      end
        
      format.json { render :json => @searchedPharmacies.to_json(), 
        :callback => params[:callback] }
    end
  end

  # GET /pharmacies/1
  # GET /pharmacies/1.json
  def show
    if !@pharmacy.nil?
      respond_to do |format|
        format.html { render 'layouts/application' }
        format.json { render :json => @pharmacy.to_json( 
          :only => [:id, :name, :address, :phone, :worktime]) }
      end
    end
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
