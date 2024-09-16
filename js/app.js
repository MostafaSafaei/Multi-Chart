fetch('../data.json')
.then(function(response){
  if(response.ok == true){
    return response.json();
  }
})
.then(function(data){
  console.log(data);
  for(let i in data){
    createChart(data,'bar')
  }
})

const legendmargin = {
  id: 'legendMargin',
  afterInit(chart, arg, plugins){
    console.log(chart.legend.fit)
    const originalFit = chart.legend.fit;
    chart.legend.fit = function fit(){
      if(originalFit){
        originalFit.call(this)
      }
      return this.height += 50
    }
  }
}

function createChart(data, type){

const ctx = document.getElementById("canvas");

  new Chart(ctx, {
    plugins: [ChartDataLabels,legendmargin],
    type: 'bar',
    data: {
      labels: data.map(row => row.date),
      datasets: [{
        label: '# of First',
        data: data.map(row => row.firstData),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.7
      },
      {
        label: '# of Second',
        data: data.map(row => row.secondData),
        backgroundColor:'rgba(54, 162, 235, 0.7)',
        borderColor:'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.7
      },
      {
        label: '# of Third',
        data: data.map(row => row.thirdData),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.7
      }
    ]
    },
    options: {
      plugins: {
        legend:{
          display: true
        },
        datalabels: {
          anchor: 'end',
          offset: -30,
          rotation: -90,
          align: 'bottom',
          color: ((context) => {
            const datasetIndex = context.datasetIndex;
            const colorMap = ['rgb(255, 99, 132)', 'rgb(54, 162, 255)', 'rgb(75, 192, 192)'];
            return colorMap[datasetIndex] || 'red';
          }),
              font: {
                size: 18,
                weight: 'bold'
            }
        },
        tooltip:{
          titleSpacing: 20,
        }
      },
      
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}