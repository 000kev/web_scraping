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
                    
                    let _h2 = headings.querySelector('h2 > a');
                    //let content = headings.getAttribute("class")

                    let _h3 = Array.from(headings.querySelectorAll('div[class="section-list-item-articles"] div[class="section-list-article"]').values()).map(el => {
                        
                        let tempObj = [];
                        let heading = el.querySelector('div.section-list-article-title.open');
                        let body = el.querySelector('div.section-list-article-text.formatted div.section-list-article-text-body')
                        tempObj.push({"h3": heading.textContent, "body": body.innerHTML})

                        return tempObj;
                    });
                    
                    let cont = [];
                    _h3.forEach((e) => {
                        cont.push(e);
                    });


                    dataObj.push({
                        "h2": _h2.textContent,
                        "data": cont
                    });

                    return dataObj;
                })
                )
                
                let packet = {
                    "title": await newPage.title(),
                    "content": JSON.stringify(section_list)
                }
                //console.log(packet)
                await fs.appendFile('dog-owners-data.json', JSON.stringify(packet)+',', 'utf8', (e) => console.log(e))
            }
            
            ))
        } catch (error) {
            console.log(error)
        }
    }
};



module.exports = scraperObject;