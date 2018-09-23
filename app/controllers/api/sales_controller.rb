class Api::SalesController < ApplicationController
  def index
    render json: Sale.all
  end

  def create
    fruit = Sale.create(fruit_params)
    render json: fruit
  end

  def destroy
    Sale.destroy(params[:id])
  end

  def update
    fruit = Sale.find(params[:id])
    fruit.update_attributes(fruit_params)
    render json: fruit
  end

  private

  def sale_params
    params.require(:fruit).permit(:id, :name, :description)
  end
end