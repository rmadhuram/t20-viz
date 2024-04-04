let fs = require('fs')

let seasonData = []

for (let pattern of ['../data/1359*', '../data/1370*']) {
  console.log(pattern)
  let glob = require('glob-fs')({ gitignore: true });
  let files = glob.readdirSync(pattern);

  for (let file of files) {
    let contents = fs.readFileSync(file, 'utf-8')  
    let data = JSON.parse(contents)
    seasonData.push(data)
    console.log(data.info.event.match_number)
  }
}

fs.writeFileSync('season-2023.json', JSON.stringify(seasonData, null, 2))
