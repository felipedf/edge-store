class Api::SalesController < ApplicationController
  def index
    render json: Sale.all
  end

  def create
    sale = Sale.create(sale_params)
    render json: sale
  end

  def destroy
    Sale.destroy(params[:id])
  end

  def update
    sale = Sale.find(params[:id])
    sale.update_attributes(sale_params)
    render json: sale
  end

  private

  def sale_params
    params.require(:sale).permit(:id, :manufacturer, :description)
  end
end