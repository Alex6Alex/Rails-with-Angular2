class StaticPagesController < ApplicationController
  prepend_view_path(Rails.root.join('public'))

  def home
  	#render 'layouts/application'
  	respond_to do |format|
  		format.html { render 'layouts/application' }
      format.json { render :json => 'qwert'.to_json() }
  	end
  end

  `def medicines
    json_data = {"a" => "date","b" => "week"};
  	respond_to do |format|
  		format.html { render 'layouts/application' }
      format.json { render :json => json_data.to_json() }
  	end
  end

  def pharmacies
    respond_to do |format|
      format.html { render 'layouts/application' }
    end
  end`

end
