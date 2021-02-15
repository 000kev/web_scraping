const fs = require('fs')


const scraperObject = {
    url: 'https://support.rover.com/hc/en-us/',
    async scraper(browser){

        try {

            let page = await browser.newPage();
          

            console.log(`Navigating to ${this.url}...`);
            await page.goto(this.url, {
                waitUntil: 'load',
                timeout: 0
            });
            
        
            let links = await page.$$eval('div.cat-tree > section section.sect > ul a', cards => cards.map(card => card.href))
            //console.log(links)
            
            links.map(link => new Promise(async(resolve, reject) => {

                let newPage = await browser.newPage();
                await newPage.goto(link, {
                    waitUntil: 'load',
                    timeout: 0
                });

                let articles = await newPage.$$eval('main.article-column', async el => el.map(article => {
                    let heading = article.querySelector('article > h1').textContent
                    let body = article.querySelector('article > div.article-body.markdown').textContent
                    return {"title": heading, "data": body}
                }))

                await fs.appendFile('rover-data.json', JSON.stringify(articles)+',', 'utf8', (e) => console.log(e))
                //console.log(articles)
            }))
            
            
        } catch (error) {
            console.log(error)
        }
    }
};



module.exports = scraperObject;