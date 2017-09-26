class GroupsController < ApplicationController
	before_action :set_group, only: [:show, :edit, :update, :destroy]

	# GET /groups
  # GET /groups.json
  def index
    	@groups = AtcGroup.select(:id, :code, :description)
      #SELECT id, code, description FROM atc_groups
    	respond_to do |format|
      	format.html { render 'layouts/application' }
      	format.json { render json: @groups.to_json }
    	end
  end

  # GET /groups/A
  # GET /groups/A.json
  def show
  	respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render json: @group.to_json(only: [:id, :code, :description], include: [:atcSubGroups]) }
    end
  end

  def search
    respond_to do |format|
      if !params[:search].blank?
        @searchedMedicines = Medicine.select(:id, :name, :form)
          .where('LOWER(name) LIKE LOWER(?)', "%#{params[:search]}%")
        # SELECT id, name, form FROM medicines
        # WHERE LOWER(name) LIKE LOWER(search_param)
      else
        @searchedMedicines = nil
      end
        
      format.json { render :json => @searchedMedicines.to_json, callback: params[:callback] }
    end
  end
  
  def update; end

  def destroy; end

 	private
		# Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = AtcGroup.find_by!(code: params[:code])
    end	

end
