const fs = require('fs');

const scraperObject = {
    url: 'https://support.sittercity.com/hc/en-us',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        
        let blocks = await page.$$eval('ul.blocks-list > li > a', pages => pages = pages.map(el => {
            return {
                "h1": el.querySelector('h4').textContent,
                "link": el.href
            }
        }));

        let pagePromise = (block, dataObj) => new Promise(async(resolve, reject) => {
            
            let newPage = await browser.newPage();
            await newPage.goto(block.link);
            

            let sections = await newPage.$$eval('div.section-tree section.section > h3 > a', section => section = section.map(el => {
                return {
                    "h2": el.textContent,
                    "link": el.href
                };
            }));

            let dataArr = [];
            for (section in sections) {
                let packet = {};
                let current = sections[section];
                let sectionPage = await browser.newPage();

                packet['h2'] = current.h2;
                await sectionPage.goto(current.link);

                let articles = await sectionPage.$$eval('ul.article-list > li > a', article => article = article.map(el => {
                    return {
                        "h3": el.textContent,
                        "link": el.href
                    }
                }));

                let articleArr = [];
                for (article in articles) {
                    let packet2 = {};
                    let current2 = articles[article];
                    let articlePage = await browser.newPage();

                    packet2['h3'] = current2.h3;
                    await articlePage.goto(current2.link);

                    let body = await articlePage.$eval('section.article-info > div > div.article-body', el => el.textContent);
                    packet2['h4'] = body;
                    articleArr.push(packet2);
                    await articlePage.close();
                }

                //packet['data'] = JSON.stringify(articleArr);
                packet['data'] = articleArr;
                dataArr.push(packet);
                await sectionPage.close();
            }
            dataObj['data'] = dataArr;

            resolve(dataObj);
            await newPage.close();
        })

        let data = [];
        for (block in blocks) {
            let dataObj = {};
            let current = blocks[block];
            dataObj['h1'] = current.h1;

            let currentPageData = await pagePromise(current, dataObj);
            //console.log(currentPageData);
            data.push(currentPageData);
        }
        await page.close();
        await fs.appendFile('json/sittercity-data.json', JSON.stringify(data), 'utf8', (e) => console.log(e))
    }
}

module.exports = scraperObject;