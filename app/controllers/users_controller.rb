class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  exclude_xsrf_token_cookie

  # GET /users
  # GET /users.json
  def index
    @users = User.all
    respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render :json => @users.to_json()}
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    if !@user.nil?
      respond_to do |format|
        format.html { render 'layouts/application' }
        format.json { render :json => @user.to_json()}
      end
    else
      redirect_to root_url
    end
  end

  # GET /users/new
  def new
    if !current_user
      @user = User.new
      respond_to do |format|
        format.html { render 'layouts/application' }
      end
    else
      redirect_to root_url
    end
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    if @user.save
        sign_in @user
    respond_to do |format|
      
        format.html { render 'layouts/application' } #, notice: 'User was successfully created.' }
        format.json { render :json => @user.to_json() }
      #else
      #  format.json { render json: @user.errors.to_json(), status: :unprocessable_entity }
      #end
    end
  end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user ||= User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
end
