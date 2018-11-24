class UsersController < ApplicationController

def index
end

def edit
end

def update
  if current_user.update(user_params)
    redirect_to root_path
  else
    render :edit
  end
end

end
