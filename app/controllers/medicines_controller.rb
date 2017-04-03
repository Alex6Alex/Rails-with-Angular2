class MedicinesController < ApplicationController
  before_action :set_medicine, only: [:show, :edit, :update, :destroy]
  #before_action :set_sub_group, only: [:create]

  # GET /medicines
  # GET /medicines.json
  def index
    @groups = AtcGroup.select(:id, :code, :description)
    respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render :json => @groups.to_json() }
    end
  end

  # GET /groups/A/A11/1
  # GET /groups/A/A11/1.json
  def show
    respond_to do |format|
      format.html { render 'layouts/application' }

      prices = Pharmacy.joins("INNER JOIN price_lists ON pharmacies.id = price_lists.pharmacy_id")
        .select("pharmacies.id, pharmacies.name, pharmacies.address, pharmacies.phone,
        pharmacies.worktime, price_lists.id, price_lists.price, price_lists.count, price_lists.updated_at")
        .where("price_lists.medicine_id = #{@medicine.id}")
        .order(:name)

      id ||= current_user.id if !current_user.nil?

      format.json { render :json => { :medicine => @medicine, :prices => prices, :id => id } }
    end
  end

  def search
    respond_to do |format|
      if !params[:search].blank?
        join_text = "INNER JOIN price_lists ON price_lists.pharmacy_id = #{params[:id]} 
          AND price_lists.medicine_id = medicines.id"
        select_text = "medicines.id, medicines.name, medicines.form, price_lists.price"

        @searchedMedicines = Medicine
          .select(select_text)
          .joins(join_text)
          .where('LOWER(medicines.name) LIKE LOWER(?)', "%#{params[:search]}%")
      else
        @searchedMedicines = nil
      end
        
      format.json { render :json => @searchedMedicines.to_json(), 
        :callback => params[:callback] }
    end
  end

  def order
    time = params[:time]
    join_text = "INNER JOIN price_lists ON pharmacies.id = price_lists.pharmacy_id"
    select_text = "pharmacies.id, pharmacies.name, pharmacies.address, pharmacies.phone,
        pharmacies.worktime, price_lists.price, price_lists.count, price_lists.updated_at"

    if time == 'all'
      prices = Pharmacy.joins(join_text)
        .select(select_text)
        .where("price_lists.medicine_id = ?", params[:id])
        .order(params[:order])
    else
      if time == 'day'
        prices = Pharmacy.joins(join_text)
          .select(select_text)
          .where("price_lists.medicine_id = ?", params[:id])
          .where.not("pharmacies.worktime = 'круглосуточно'")
          .order(params[:order])
      else
        prices = Pharmacy.joins(join_text)
          .select(select_text)
          .where("price_lists.medicine_id = ? AND pharmacies.worktime = 'круглосуточно'", 
            params[:id])
          .order(params[:order])
      end
    end

    respond_to do |format|
      format.json { render :json => prices.to_json }
    end
  end

  # GET /medicines/new
  def new
    if current_user.admin?
      @medicine = Medicine.new
      respond_to do |format|
        format.html { render 'layouts/application' }
      end
    else
      redirect_to current_user
    end
  end

  # GET /medicines/1/edit
  def edit
    respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render :json => @medicine.to_json(:include => [:atcSubGroup]) }
    end
  end

  # POST /medicines
  # POST /medicines.json
  def create
    @sub_group = AtcSubGroup.find_by(id: params[:medicine][:atc_sub_group_id])
    
    if @sub_group
      @medicine = @sub_group.medicines.build(medicine_params)
    else 
      respond_to do |format| 
        format.json { render :json => { :status => false } }
      end
      return
    end

    if(@medicine.package == nil)
      @medicine.package = 'не указана'
    end

    if(@medicine.comment == nil)
      @medicine.comment = 'Описание отсутствует'
    end

    respond_to do |format|
      if @medicine.save
        id = @medicine.id

        format.json { render :json => { :status => true, :id => id } }
      else
        format.json { render :json => { :status => false, :errors => @medicine.errors } }
      end
    end
  end

  # PATCH/PUT /medicines/1
  # PATCH/PUT /medicines/1.json
  def update
    if current_user.admin?
      if(params[:medicine][:pack].nil? || params[:medicine][:pack].empty?)
        params[:medicine][:pack] = 'не указана'
      end

      if(params[:medicine][:comment].nil? || params[:medicine][:comment].empty?)
        params[:medicine][:comment] = 'Описание отсутствует'
      end

      respond_to do |format|
        if @medicine.update(medicine_params)
          id = @medicine.id
          format.json { render :json => { :status => true, :id => id } }
        else
          format.json { render :json => { :status => false, :errors => @medicine.errors } }
        end
      end
    end
  end

  # DELETE /medicines/1
  # DELETE /medicines/1.json
  def destroy
    @medicine.destroy if current_user.admin?
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_medicine
      @medicine = Medicine.select(:id, :name, :form, :package, :comment, :atc_sub_group_id).find(params[:id])
    end

    def set_sub_group
      params.require(:atcSubGroup).permit(:id)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def medicine_params
      params.require(:medicine).permit(:name, :atc_sub_group_id, :form, :pack, :comment)
    end
end
