class GroupsController < ApplicationController
	before_action :set_group, only: [:show, :edit, :update, :destroy]

	# GET /groups
  # GET /groups.json
  def index
    	@groups = AtcGroup.select(:id, :code, :description)
    	respond_to do |format|
      	format.html { render 'layouts/application' }
      	format.json { render :json => @groups.to_json() }
    	end
  end

  # GET /groups/A
  # GET /groups/A.json
  def show
  	respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render :json => @group.to_json(:only => [:id, :code, :description],
        :include => [:atcSubGroups]) }
    end
  end
  
  def update
  end

  def destroy
 	end

 	private
		# Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = AtcGroup.find_by!(code: params[:code])
    end	

end
