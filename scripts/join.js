let glob = require('glob-fs')({ gitignore: true });
let files = glob.readdirSync('../data/1359*.json');
let fs = require('fs')

let seasonData = []
for (let file of files) {
  let contents = fs.readFileSync(file, 'utf-8')  
  let data = JSON.parse(contents)
  seasonData.push(data)
  console.log(data.info.event.match_number)
}

fs.writeFileSync('season-2023.json', JSON.stringify(seasonData, null, 2))
