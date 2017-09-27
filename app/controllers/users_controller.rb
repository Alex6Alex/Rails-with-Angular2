class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]
  before_action :admin_user, only: %i[index destroy]
  exclude_xsrf_token_cookie

  # GET /users
  # GET /users.json
  def index
    @users = User.select(:id, :name, :email, :phone, :admin).order(:name)
    # SELECT id, name, email, phone, admin FROM users ORDER BY name
    respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { render json: @users.to_json }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    if !@user.nil?
      respond_to do |format|
        format.html { render 'layouts/application' }
        format.json { render json: @user.to_json(only: %i[id name email phone created_at admin]) }
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
    if !@user.nil?
      respond_to do |format|
        format.html { render 'layouts/application' }
        format.json { render json: @user.to_json(only: %i[id name email phone]) }
      end
    else
      redirect_to root_url
    end
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    reg_exp = /^[\+][0-9]{1}[\(][0-9]{3}[\)][0-9]{3}[\-][0-9]{2}[\-][0-9]{2}$/
    unless reg_exp == @user.phone
      @user.phone = 'не указан'
    end

    respond_to do |format|
      if @user.save

        if User.count == 1
          @user.toggle!(:admin)
        end

        sign_in @user

        id = @user.id
        format.json { render json: { status: true, id: id } }
      else
        format.json { render json: { status: false, errors: @user.errors } }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      reg_exp = /^[\+][0-9]{1}[\(][0-9]{3}[\)][0-9]{3}[\-][0-9]{2}[\-][0-9]{2}$/
      unless reg_exp == params[:phone]
        params[:phone] = 'не указан'
      end

      if @user.update(user_params)
        id = @user.id
        format.json { render json: { status: true, id: id } }
      else
        format.json { render json: { status: false, errors: @user.errors } }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy if current_user.admin?
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user ||= User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.permit(:name, :email, :phone, :password, :password_confirmation)
    end

    # only admin destroy
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
end
