class AddColumnTypeToSale < ActiveRecord::Migration[5.2]
  def change
    add_column :sales, :column_type, :string
  end
end
