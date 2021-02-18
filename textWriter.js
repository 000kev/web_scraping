const fs = require('fs')

DATA_JSON = 'rover-data.json'
FILENAME = 'output/rover-output.txt';
const tab1 = '                              ';
const tab2 = '                         ';
const tab3 = '                    ';
const tab4 = '               '
const tab5 = '          '

//ROVER
// fs.readFile(DATA_JSON, 'utf8', (err, data) => {
//     let data_parsed = JSON.parse(data);
    
//     //console.log(data_parsed[2][0]);
//     data_parsed.forEach(element => {
//         let line1 = tab5+'<h1>'+element[0].title+'</h1>'+'\n';
//         let line2 = tab4+'<h4>'+element[0].data+'</h4>'+'\n';
//         fs.appendFile(FILENAME, line1+line2, (e) => {
//             return {"error": e}
//         });
//     });
// })

// WAG
// fs.readFile(DATA_JSON, 'utf8', (err, data) => {
//     let data_parsed = JSON.parse(data)
//     //let data_one = JSON.parse(data_parsed[1])

//     console.log(data_parsed[0].title)
//     // console.log(data_parsed[1].data[0])
//     // console.log(data_parsed[1].data[0].data[0])

//     // data_parsed.forEach(element => {
//     //     element.data.forEach(a => {
//     //         a.data.forEach(b => {
//     //             console.log(b.h3);
//     //         })
//     //     })
//     // });
//     data_parsed.forEach(element => {
//         let line1 = tab5+'<h1>'+element.title+'</h1>'+'\n';
//         fs.appendFile(FILENAME, line1, (e) => {
//             return {"error": e}
//         });
//         if (element.data.length===0) {}
//         else if (element.data.length===1) {
//             let line2 = tab4+'<h2>'+element.data[0].h2+'</h2>'+'\n';
//                 fs.appendFile(FILENAME, line2, (e) => {
//                     return {"error": e}
//                 });
//                 if (element.data[0].data.length===0) {
//                     fs.appendFile(FILENAME, tab3+'<h3>'+element.data[0].h3+'</h3>'+'\n', (e) => {
//                         return {"error": e}
//                     });
//                 }
//                 else if (element.data[0].data.length===1) {
//                     let line3 = tab3+'<h3>'+element.data[0].data[0].h3+'</h3>'+'\n';
//                     let line4 = tab2+'<h4>'+element.data[0].data[0].data+'</h4>'+'\n\n';
//                     fs.appendFile(FILENAME, line3+line4, (e) => {
//                         return {"error": e}
//                     });
//                 }
//                 else {
//                     element.data[0].data.forEach(b => {
//                         let line3 = tab3+'<h3>'+b.h3+'</h3>'+'\n';
//                         let line4 = tab2+'<h4>'+b.data+'</h4>'+'\n\n';
//                         fs.appendFile(FILENAME, line3+line4, (e) => {
//                             return {"error": e}
//                         });
//                     });
//                 }
//         }
//         else {
//             element.data.forEach(a => {
//                 let line2 = tab4+'<h2>'+a.h2+'</h2>'+'\n';
//                 fs.appendFile(FILENAME, line2, (e) => {
//                     return {"error": e}
//                 });
//                 if (a.data.length===0) {
//                     fs.appendFile(FILENAME, tab3+'<h3>'+a.h3+'</h3>'+'\n', (e) => {
//                         return {"error": e}
//                     });
//                 }
//                 else if (a.data.length===1) {
//                     let line3 = tab3+'<h3>'+a.data[0].h3+'</h3>'+'\n';
//                     let line4 = tab2+'<h4>'+a.data[0].data+'</h4>'+'\n\n';
//                     fs.appendFile(FILENAME, line3+line4, (e) => {
//                         return {"error": e}
//                     });
//                 }
//                 else {
//                     a.data.forEach(b => {
//                         let line3 = tab3+'<h3>'+b.h3+'</h3>'+'\n';
//                         let line4 = tab2+'<h4>'+b.data+'</h4>'+'\n\n';
//                         fs.appendFile(FILENAME, line3+line4, (e) => {
//                             return {"error": e}
//                         });
//                     });
//                 }
//             });
//         }
//     });
// });