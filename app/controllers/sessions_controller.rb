class SessionsController < ApplicationController
	protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

	def new
		puts sign_state
	end

	def create
		user = User.find_by(email: params[:session][:email].downcase)
		respond_to do |format|
			if user && user.authenticate(params[:session][:password])
				sign_in user
				format.html { render 'layouts/application' }
				format.json { render json: user.to_json() }
			else
				format.json { render json: "error".to_json(), status: :unprocessable_entity }
			end
		end
	end

	def delete
		sign_out
	end

	def sign_state
		respond_to do |format|
			format.html { render 'layouts/application' }
			format.json { render json: signed_in?.to_json() }
		end
	end

end
