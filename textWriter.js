const fs = require('fs')

fs.readFile('dog-owners-data.json', 'utf8', (err, data) => {
    let data_parsed = JSON.parse(data)
    //let data_one = JSON.parse(data_parsed[1])

    console.log(data_parsed[1].data)
    // console.log(data_parsed[1].data[0])
    // console.log(data_parsed[1].data[0].data[0])

    data_parsed.forEach(element => {
        element.data.forEach(a => {
            a.data.forEach(b => {
                console.log(b.h3);
            })
        })
    });
})