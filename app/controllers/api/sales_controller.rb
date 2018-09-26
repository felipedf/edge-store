class Api::SalesController < ApplicationController
  include ActiveSupport::NumberHelper

  def index
    sales = Sale.all.group_by{|h| h[:column_type]}
    render json: sales
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
    params.require(:sale).permit(:id, :manufacturer, :description, :price, :column_type, :column_update)
  end
end