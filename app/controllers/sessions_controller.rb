class SessionsController < ApplicationController
	exclude_xsrf_token_cookie

	def new
		puts sign_state
	end

	def create
		user = User.find_by(email: params[:session][:email].downcase)
		respond_to do |format|
			if user && user.authenticate(params[:session][:password])
				sign_in user
				user_data = {'id': user.id, 'name': user.name, 'email': user.email,
							'admin': user.admin}
				format.html { render 'layouts/application' }
				format.json { render json: user_data.to_json() }
			else
				format.json { render json: "Invalid email or password".to_json(), status: :unprocessable_entity }
			end
		end
	end

	def destroy
		sign_out
		respond_to do |format|
			format.html { render 'layouts/application' }
			format.json { render json: signed_in?.to_json() }
		end
	end

	def sign_state
		respond_to do |format|
			user = { 'id': current_user.id, 'name': current_user.name, 
					'email': current_user.email, 'admin': current_user.admin}
			json_data = { 'sign' => signed_in?, 'user' => user }
			format.html { render 'layouts/application' }
			format.json { render json: json_data.to_json() }
		end
	end

end
