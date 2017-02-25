class SubGroupsController < ApplicationController
	before_action :set_sub_group, only: [:show, :edit, :update, :destroy]

	# GET /groups/A
  # GET /groups/A.json
  def index
  end

  # GET /groups/A/A1
  # GET /groups/A/A1.json
  def show
    respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render :json => {:group => @sub_group, 
        :subgroups => nil }.to_json() }
    end
  end
  
  def update
  end

  def destroy
 	end

 	private
		# Use callbacks to share common setup or constraints between actions.
    def set_sub_group
      @sub_group = AtcSubGroup.find_by!(code: params[:code])
    end	

end