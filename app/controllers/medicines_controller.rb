class MedicinesController < ApplicationController
  before_action :set_medicine, only: [:show, :edit, :update, :destroy]

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
        pharmacies.worktime, price_lists.price, price_lists.count, price_lists.updated_at")
        .where("price_lists.medicine_id = #{@medicine.id}")
        .order(:name)

      format.json { render :json => { :medicine => @medicine, :prices => prices} }
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
    @medicine = Medicine.new
  end

  # GET /medicines/1/edit
  def edit
  end

  # POST /medicines
  # POST /medicines.json
  def create
    @medicine = Medicine.new(medicine_params)

    respond_to do |format|
      if @medicine.save
        format.html { redirect_to @medicine, notice: 'Medicine was successfully created.' }
        format.json { render :show, status: :created, location: @medicine }
      else
        format.html { render :new }
        format.json { render json: @medicine.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /medicines/1
  # PATCH/PUT /medicines/1.json
  def update
    respond_to do |format|
      if @medicine.update(medicine_params)
        format.html { redirect_to @medicine, notice: 'Medicine was successfully updated.' }
        format.json { render :show, status: :ok, location: @medicine }
      else
        format.html { render :edit }
        format.json { render json: @medicine.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /medicines/1
  # DELETE /medicines/1.json
  def destroy
    @medicine.destroy
    respond_to do |format|
      format.html { redirect_to medicines_url, notice: 'Medicine was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_medicine
      @medicine = Medicine.select(:id, :name, :form, :package, :comment).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def medicine_params
      params.require(:medicine).permit(:name, :classification, :form, :package, :comment)
    end
end
