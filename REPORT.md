Problem Statement:
Tracking cryptocurrency prices can be difficult and time consuming, making it hard to determine when to invest your money. The CryptoBot solves this problem by keeping track of your favorite cryptocurrencies and notifying the user of key changes in the crypto market.

Primary Features and screenshots:

Updating: One primary feature of the crypto bot is that it tracks cryptocurrency prices. In the following screenshot the coins Ethereum and Bitcoin were being tracked and at 12:00 am on a monday, the the daily prices as well as the weekly prices of the two coins have been updated.
![updating](https://user-images.githubusercontent.com/76269922/167482749-e7ae33cb-b611-4c50-ac5f-eeb393bfbcb6.png)

Percentages: Another function the bot has is to calculate the weekly, monthly, and daily percentage change of the price of the select cryptocurrency. Below shows the functions pcd, pcw, and pcm which shows the daily, weekly, and monthly percentage change respectively. The function also takes into account the crypto symbol of a coin you are tracking to show a specific coins percentage changes.
![pcw](https://user-images.githubusercontent.com/76269922/167482746-907d4021-d6b3-4a1c-bc79-d3516e5a88c2.png)

Total Report: The total report function shows the complete report of all crypto currencies currently being tracked by the bot. It shows the monthly, weekly, and daily percentage changes of the cryptocurrency. It is important to note that since the bot updates monthly, weekly, and daily when the bot is running in the background that the current values in the database are not accurate. However, if the bot was running for the complete time, i.e over a month, then the prices would be accurate.
![totalReport](https://user-images.githubusercontent.com/76269922/167482737-111bee74-4e71-452b-b763-6169808eea7f.png)

Adding a coin: In order to add a coin to track, the user has to simply input the crypto currency symbol of the coin they would like to add with the word add before it such as “add BTC” to add bitcoin to track. It also returns the current price of the coins as well. An example is shown below adding ADA.
![adding](https://user-images.githubusercontent.com/76269922/167482731-f710b6ac-cdf0-4cd8-8634-58b904346325.png)

Getting a cryptos current price: In order to get a cryptocurrencies current price on the market, a user will input “get <crypto symbol>” which will get the latest price of that coin. Below is an example:
![getting](https://user-images.githubusercontent.com/76269922/167482726-0ee2ded5-d19d-4427-bf64-e77529123da3.png)

Reflection:

In developing this project there were many challenges we faced along the way. The first challenge was to establish a clear and concise idea of what to originally create. We initially decided to work with a task bot, but then quickly realized that it was nothing that we would like to work on nor would be useful to us given the apps we currently have such as canvas. Once we switched to doing a crypto bot, we had a clearer picture of what we wanted the project to look like and had an easier time creating issues. One thing we could have done much better was to look more into the platform we were using, and conduct better research to find easier solutions. One aspect that could’ve been implemented could be hosting the project on heroku. Since this project does intend to run indefinitely, grabbing data at specific times in the year, heroku could have hosted the project and we would have something constantly running instead of starting and stopping the project as we went along.

Limitations:
One of the limitations of the project is as it currently sits you can not look up multiple coin prices in one line you should have to do 2 commands in order to achieve this this is something that could be adjusted in the future but is currently not implemented. Another limitation of the bot is the API. When selecting a specific API, we don’t get the exact prices that other platforms may have settled on. For example, on robinhood the prices for bitcoin may be different from the one on coinmarketcap. Without a definitive price on what a currency is worth, it can be difficult to get an exact price. Another limitation that our bot has is that it’s always set in USD. The bot does track where you are located, so for future implementations, we could add a portion that retrieves the users local currency, but we settled on USD for this project since it is a global currency. Other future implementations would also include notifying the individual of when a currency goes above or below a certain percentage, that way the user will know when select currencies are changing drastically, giving them a better idea of when to buy or sell more of that currency. Overall, there are many things we could add to this project which is part of the reason why we chose to do this project, since we knew there could be so much added to it, as well as being incredibly useful.
