const fs = require('fs')


const scraperObject = {
    url: 'https://help.wagwalking.com/category/dog-owners',
    async scraper(browser){

        try {

            let page = await browser.newPage();
            console.log(`Navigating to ${this.url}...`);
            await page.goto(this.url);
            
        
            let links = await page.$$eval('div[class="content-main__inner"] ul li > a', cards => cards.map(card => card.href))
            //console.log(links)

            let arr = links.map(link => new Promise(async(resolve, reject) => {
                
                let newPage = await browser.newPage();
                await newPage.goto(link);
                
            
                let section_list = await newPage.$$eval('div[class="section-list-wrap"] > div',async h2 => h2.map(headings => {
                    let dataObj = [];
                    let _id = headings.querySelector('h2 > a');
                    //let content = headings.getAttribute("class")
                    let content = headings.lastElementChild.innerText;

                    dataObj.push(_id.textContent);
                    dataObj.push(content);
                    //writer(dataObj)
                    return dataObj;
                })
                )
                await fs.appendFile('dog-owners-data.json', JSON.stringify(section_list), 'utf8', (e) => console.log(e))
                return console.log(section_list)
                
            }
            ))
        } catch (error) {
            console.log(error)
        }
    }
};



module.exports = scraperObject;