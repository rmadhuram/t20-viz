const t = d3.transition()
    .duration(2000)

function getStats(matches) {
  let stats = [
    {balls: 0, runs: 0, wickets: 0},
    {balls: 0, runs: 0, wickets: 0}
  ]
  for (let match = 0; match < matches.length; match++) {
    for (let innings = 0; innings < matches[match].innings.length; innings++) {
      let overs = matches[match].innings[innings].overs
      for (let i=0; i<overs.length; i++) {
        for (let j=0; j<overs[i].deliveries.length; j++) {
          let ballData = overs[i].deliveries[j]
          stats[innings].balls++
          stats[innings].runs += ballData.runs.total
          if (ballData.wickets) {
            stats[innings].wickets += ballData.wickets.length
          }
        }
      }
    }
  }

  console.log(stats)
  return stats
}

function getRuns(overs) {
  let runs = []
  for (let i=0; i<overs.length; i++) {
    for (let j=0; j<overs[i].deliveries.length; j++) {
      runs.push(overs[i].deliveries[j])
    }
  }
  return runs
}

function drawLineMarker(x, data) {
  d3.select('svg')
    .append('line')
    .attr('x1', x)
    .attr('y1', 0)
    .attr('x2', x)
    .attr('y2', data.length * 6 -1 )
    .attr('style', 'stroke:#888;stroke-width:2')
    .attr('class', 'marker')
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
          .attr('y', match * 3)
          .attr('rx', 3)
          .attr('ry', 3)
          .attr('width', 5)
          .attr('height', 5)
          .attr('opacity', 0.8)
          .style('fill', function(d) {
            if (d.wickets) {
              return 'black'
            }
            return colors[d.runs.total]
          })   
          .transition(t)
          .attr('x', function(d, ball) {
            let cx = ball * 5 + innings * 680 + 10
            return cx;
          })
          .attr('y', match * 6)
      }
    }

    let stats = getStats(data)
    for (let inning = 0; inning < 2; inning++) {
      $(`.stats-innings-${inning + 1} .stats .runs h3`).text(numeral(stats[inning].runs).format('0,0'))
      $(`.stats-innings-${inning + 1} .stats .wickets h3`).text(numeral(stats[inning].wickets).format('0,0'))
      let rr = stats[inning].runs * 6 / stats[inning].balls
      $(`.stats-innings-${inning + 1} .stats .rr h3`).text(numeral(rr).format('0.00'))
    }

    drawLineMarker(10, data)
    drawLineMarker(190, data)
    drawLineMarker(15*6*5 + 10, data)
    drawLineMarker(20*6*5 + 10, data)

    drawLineMarker(680 + 10, data)
    drawLineMarker(680 + 190, data)
    drawLineMarker(680 + 15*6*5 + 10, data)
    drawLineMarker(680 + 20*6*5 + 10, data)


  });

 
}

$(draw)