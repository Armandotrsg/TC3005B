const assert  = require('assert');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

describe("Sauce Demo", function() {
    it('should checkout 2 items', async function() {
        const driver = await new Builder().forBrowser(Browser.CHROME).build()
        await driver.get('https://saucedemo.com')
        //Login
        await driver.findElement(By.xpath('//*[@id="user-name"]')).sendKeys('') //Invalid
        await driver.findElement(By.xpath('//*[@id="login-button"]')).click()

        await driver.findElement(By.xpath('//*[@id="user-name"]')).sendKeys('standard_user')
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('secret_sauce')
        await driver.findElement(By.xpath('//*[@id="login-button"]')).click()

        //Add to cart
        await driver.findElement(By.xpath('//*[@id="add-to-cart-sauce-labs-backpack"]')).click()
        await driver.findElement(By.xpath('//*[@id="add-to-cart-sauce-labs-bike-light"]')).click()

        //Click to cart
        await driver.findElement(By.xpath('//*[@id="shopping_cart_container"]/a')).click()

        //Click checkout
        await driver.findElement(By.xpath('//*[@id="checkout"]')).click()
        //await driver.findElement(By.css(".checkout_buttons")).click()

        //Fill checkout form
        await driver.findElement(By.xpath('//*[@id="first-name"]')).sendKeys('A')
        await driver.findElement(By.xpath('//*[@id="last-name"]')).sendKeys('T')
        await driver.findElement(By.xpath('//*[@id="postal-code"]')).sendKeys('12345')
        await driver.findElement(By.xpath('//*[@id="continue"]')).click()

        //Validate each of the prices add up to the total
        const price1Text = (await driver.findElement(By.xpath('//*[@id="checkout_summary_container"]/div/div[1]/div[3]/div[2]/div[2]/div')).getText())
        const price2Text = await driver.findElement(By.xpath('//*[@id="checkout_summary_container"]/div/div[1]/div[4]/div[2]/div[2]/div')).getText()
        const totalText = await driver.findElement(By.xpath('//*[@id="checkout_summary_container"]/div/div[2]/div[6]')).getText()

        const price1 = parseFloat(price1Text.split('$')[1])
        const price2 = parseFloat(price2Text.split('$')[1])
        const shownTotal = parseFloat(totalText.split('$')[1])
        assert.equal(price1 + price2, shownTotal)

        //Click finish checkout
        await driver.findElement(By.xpath('//*[@id="finish"]')).click()

        //Go back to home
        await driver.findElement(By.xpath('//*[@id="back-to-products"]')).click()

        return Promise.resolve()
    })
})
