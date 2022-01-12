
  const NativePage = require('./native.page.js');
  const PageData = require('../files/testData/test.data.js');
  var total_return=0;
  var odd;
  var match_name;
  var input_id;
  class sampleHomePage extends NativePage {
  
    get webdriverIOHomePageElement() {
      return this.getPage('bet.locators');
    }
  
    //method to launch the jenningsbet home page//
      openHomepage() {
      browser.url(PageData['url'])
      console.log(browser.getTitle())
      expect(browser).toHaveTitleContaining('JenningsBet')
 
     }
  
     //method to select a sport from the available list on left pane of home page//
    selectSports(){
  
      const sports = browser.$$(PageData['seemore'])
      console.log(sports.length)
      for(let i=0;i<sports.length;i++)
      {
        let temp = sports[i].$$('a')[0].getAttribute('href')
         if(temp==="/sportsbook/BASKETBALL/")
        { 
         console.log("if")
         sports[i].$$('a')[0].click()
         break 
        }
      
      }    
      
    }

    
    //method to select featured sports and adding a bet to betslip from available league//
      matchOdd(){
      browser.pause(2000)
      browser.$$(PageData['featured'])[0].click()
      browser.pause(2000)
      const matches = browser.$$(PageData['matches'])
      console.log(matches[PageData['match_number']].$$("a")[0].getText())
      match_name = matches[PageData['match_number']].$$("a")[0].getText()
      let  bet = matches[PageData['match_number']].$$(PageData['betprice'])
      console.log(bet.length)
      console.log("bet"+bet[PageData['odd_number']].getText())
      odd=bet[PageData['odd_number']].getText()
      this.potential_Value(bet[1].getText())
      bet[PageData['odd_number']].click()
      browser.pause(3000)
      return bet[PageData['odd_number']].getText()

    }

    //method to calculate potential return value based on selected odd from the website//
    potential_Value(abc){
      let factor = abc.split("/")
      console.log("factor"+factor[0]+"::"+factor[1])
      let result = factor[0]/factor[1]
      console.log(result)
      console.log((result+1).toFixed(2))
      total_return = 100*(result+1).toFixed(2)
      console.log("calc_total_return:::"+total_return)

    }
    
    //method to check the selected bet on middle pane is shown on BetSlip//
    checkprice(){
      browser.pause(3000)
      const container = browser.$(PageData['container'])
      let price = container.$(PageData['price'])
      // for debug purpose//console.log("PRICEDATA::"+price.getText())
      expect(price.getText()===odd)
      return price.getText()
      
      
    }
    //method to retrive the match information from Betslip
    checkOdd(){
      const container = browser.$(PageData['container'])
      let name = container.$(PageData['detail_name'])
      // for debug purpose //console.log("ODD::"+name.getText())
      return name.getText()
    }

    //method to check if the selected odd's team is shown as important msg on Betslip//
    checkstyle(){
      const container = browser.$(PageData['container'])
      let imp_name = container.$(PageData['strong_name'])
      console.log("BOLD TEXT:::"+imp_name.$("strong").getText())
      console.log(imp_name.getText())
     // return imp_name.getText()
     expect(match_name===imp_name.$("strong").getText())
      
    }
    //method to retrive the webelement id of 'betslipentry' inorder to enter bet by user// 
    getInput(){
      const container = browser.$(PageData['container'])
      input_id = container.$('input').getAttribute("data-id")
    //for debug use//  console.log("INPUT ID::"+input_id)
      return input_id
    }

    //method to enter betinput by user//
    addStake(){
      
      const container = browser.$(PageData['container'])
      console.log(container.getText())
      console.log("input")
      let amount = container.$("//input[@data-id="+this.getInput()+"]")
    //  let amount = container.$(this.getInput())
      amount.click()  
      browser.pause(1000)
      amount.setValue(PageData['stake_value'])
      browser.pause(1000)
      let betslip = container.$(PageData['total_stake'])
      console.log("addstake"+betslip.getText())
    
    }
    //method to read total stake value and total return and asset with expected values based on math calculation//
    totalReturns(product){
      browser.pause(2000)
      let bet_summary = browser.$(PageData['container']).$(PageData['summary'])
      console.log("Summary:::"+bet_summary.getText())

      let total_stake = bet_summary.$(PageData['stake_location'])
      console.log("Total_stake:::"+total_stake.getText())

      let potential_return = bet_summary.$(PageData['return'])
      expect(potential_return.getText()==="£"+total_return)
      expect(total_stake.getText()==="£"+"100.00")


    }
  
  }
  
  module.exports = sampleHomePage;
  