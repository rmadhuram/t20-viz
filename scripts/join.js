let fs = require('fs')

let seasonData = []
//let patterns = ['../data/1359*', '../data/1370*']
//let patterns = ['../data/1304*', '../data/1312*']
//let patterns = ['../data/1254*']
//let patterns = ['../data/1216*', '../data/1237*']
//let patterns = ['../data/1175*', '../data/1178*', '../data/1181*']
//let patterns = ['../data/1136*']
//let patterns = ['../data/1082*']
//let patterns = ['../data/980*', '../data/981*']
//let patterns = ['../data/829*']
//let patterns = ['../data/729*', '../data/733*', '../data/734*']
//let patterns = ['../data/597*', '../data/598*']
//let patterns = ['2012', ['../data/548*']]
//let patterns = ['2011', ['../data/501*']]
//let patterns = ['2010', ['../data/419*']]
//let patterns = ['2009', ['../data/392*']]
let patterns = ['2008', ['../data/335*', '../data/336*']]

let year = patterns[0]

for (let pattern of patterns[1]) {
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

console.log(`write season-${year}.json`)
fs.writeFileSync(`season-${year}.json`, JSON.stringify(seasonData, null, 2))
