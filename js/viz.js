const t = d3.transition()
    .duration(2000)

function getRuns(overs) {
  let runs = []
  console.log(overs)
  for (let i=0; i<overs.length; i++) {
    for (let j=0; j<overs[i].deliveries.length; j++) {
      runs.push(overs[i].deliveries[j].runs.total)
    }
  }
  return runs
}

function draw() {
  let colors = ['#fff', '#eee', '#aaa', '#999', 'red', 'orange', 'green', 'blue']
  $.get('scripts/season-2023.json', function(data, status){

    for (let match = 0; match < data.length; match++) {
      for (let innings = 0; innings < data[match].innings.length; innings++) {
        let id = `match-${match}-${innings}`
        let elem = d3.select('svg').append('g').attr('id', id)

        console.log(`match ${match}, innings ${innings}`)
        console.log(data[match])

        let overs = data[match].innings[innings].overs
        let runs = getRuns(overs)
        console.log(runs)
        d3.select('#' + id)
          .selectAll('rect')
          .data(runs)
          .join('rect')
          .attr('x', function(d, ball) {
            let cx = 10
            return cx;
          })
          .attr('y', 50 + match * 3)
          .attr('width', 5)
          .attr('height', 5)
          .style('fill', function(d) {
            return colors[d]
          })   
          .transition(t)
          .attr('x', function(d, ball) {
            let cx = ball * 5 + innings * 680 + 10
            return cx;
          })
          .attr('y', 50 + match * 6)
 
      }
    }

  });
}

$(draw)