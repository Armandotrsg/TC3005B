const assert = require('assert');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

describe('google search', function() {
    it('should find cats', async function() {
        let driver = await new Builder().forBrowser(Browser.CHROME).build()
        await driver.get('https://google.com')
        await driver.findElement(By.xpath('//*[@id="APjFqb"]')).sendKeys('cat', Key.RETURN)
        const text = await driver.findElement(By.xpath('//*[@id="Odp5De"]/div/div[1]/div/div[1]/block-component/div/div[1]/div/div/div/div/div[1]/div/div/div/div/div[2]/div/div/div[1]/div/span/a/h3')).getText();
        console.log('this test', text)
        return Promise.resolve()
    })
})