class AddColumnUpdateToSales < ActiveRecord::Migration[5.2]
  def change
    add_column :sales, :column_update, :datetime
  end
end
