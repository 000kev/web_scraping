const fs = require('fs')

const scraperObject = {
    url: 'https://help.wagwalking.com/category/dog-owners',
    async scraper(browser){
        let dataObj = {}
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        
       
        let links = await page.$$eval('div[class="content-main__inner"] ul li > a', cards => cards.map(card => card.href))
        //console.log(links)

        links.map(link => new Promise(async(resolve, reject) => {
            
            let scrape_data
            let newPage = await browser.newPage();

            await newPage.goto(link);
            
            let data = await newPage.evaluate(() => {
                scrape_data = document.querySelector('div[class="section-list-item-articles"]').innerHTML
                return scrape_data
            })
            //console.log(data)
            fs.appendFile('wags_dog-owners_scraped.txt', data+'\n', (e) => console.log(e))
        }))
    }
};



module.exports = scraperObject;