document.addEventListener('DOMContentLoaded', function () {
    // Dados de vendas
    fetch('data/sales-data.json')
        .then(response => response.json())
        .then(data => {
            const totalSales = data.reduce((acc, item) => acc + item.value, 0);
            const totalProducts = data.length;

            // Atualizar resumo
            document.getElementById('totalSales').innerText = totalSales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.getElementById('totalProducts').innerText = totalProducts;

            // Gráfico de Barras
            const salesBarChart = document.getElementById('salesBarChart').getContext('2d');
            const barChart = new Chart(salesBarChart, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.product),
                    datasets: [{
                        label: 'Valor das Vendas (R$)',
                        data: data.map(item => item.value),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                                }
                            }
                        }
                    }
                }
            });

            // Gráfico de Pizza
            const salesPieChart = document.getElementById('salesPieChart').getContext('2d');
            const pieChart = new Chart(salesPieChart, {
                type: 'pie',
                data: {
                    labels: data.map(item => item.product),
                    datasets: [{
                        label: 'Participação nas Vendas',
                        data: data.map(item => item.value),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
                        ],
                    }]
                },
                options: {
                    responsive: true,
                }
            });
        });
});
