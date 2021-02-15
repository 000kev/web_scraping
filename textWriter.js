const fs = require('fs')

fs.readFile('dog-owners-data.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    console.log(data[0])
})