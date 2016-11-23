class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @user = @current_user
  end

  def update
    @user = @current_user

    if @user.update(user_params)
      flas[:message] = "Profile successfully updated"
      redirect_to @user
    else
      render :edit
  end

  def show
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
