class SubGroupsController < ApplicationController
	before_action :set_sub_group, only: [:show, :destroy]

	# GET /groups/A
  # GET /groups/A.json
  def index
  end

  # GET /groups/A/A1
  # GET /groups/A/A1.json
  def show
    respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render :json => {:subgroup => @sub_group, 
        :medicines => @sub_group.medicines }.to_json() }
    end
  end

  def create
    @group = AtcGroup.find_by(code: params[:atc_group_id])
    
    if @group
      @sub_group = @group.atcSubGroups.build(sub_group_params)
    else 
      respond_to do |format| 
        format.json { render :json => { :status => false } }
      end
      return
    end

    respond_to do |format|
      if @sub_group.save
        id = @sub_group.id

        format.json { render :json => { :status => true, :id => id } }
      else
        format.json { render :json => { :status => false, :errors => @sub_group.errors } }
      end
    end
  end
  
  def update
    if current_user.admin?
      @sub_group = AtcSubGroup.find(params[:subGroup][:id])
      respond_to do |format|
        if @sub_group.update(sub_group_params)
          format.json { render :json => { :status => true } }
        else
          format.json { render :json => { :status => false, :errors => @sub_group.errors } }
        end
      end
    end
  end

  def destroy
    @sub_group.destroy if current_user.admin?
 	end

 	private
		# Use callbacks to share common setup or constraints between actions.
    def set_sub_group
      @sub_group = AtcSubGroup.find_by!(code: params[:code])
    end	

    # Never trust parameters from the scary internet, only allow the white list through.
    def sub_group_params
      params.require(:subGroup).permit(:code, :description)
    end

end