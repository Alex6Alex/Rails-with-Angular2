class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
  	#render 'layouts/application'
  	respond_to do |format|
  		format.html { render 'layouts/application' }
  	end
  end
end
