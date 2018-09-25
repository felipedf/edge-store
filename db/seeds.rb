sales = [
  ['ABC Industria', 'Venda de maquina XPZ500', 100000],
  ['Nestle', 'Servico manutencao', 5000]
]

sales.each do |sale|
  Sale.create(manufacturer: sale[0], description: sale[1], price: sale[2])
end