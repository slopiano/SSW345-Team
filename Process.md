Scrum  meeting 1 (4/13):

-Issue Assigned: Database setup - Sean Hicks (points: 2)
-Issue Assigned: Connection to discord - Sebastian, Jonathan (points: 1)
-Issue Assigned: Api connection - Sebastian (points 3)
-Issue Assigned: Edit data and create calculations - Gigi (points 3)

Current meeting progress:
-Setting up github issues and basic project scope
-Assigning individuals to issues
-Coming up with basic structure of project

Notes: 
Basic user setup of the crypto bot needs to be set up. Users need to be able to track specific coins that they would like to track, which will require a database of their coins. The bot also needs to be able to communicate through discord and commands which is the discord setup. Some calculations need to be made on the data since the user would like to know percentage changes throughout a specific time frame. 

Reflection: Upon further analysis of the previous project, we thought that we were too ambiguous so we decided to be a little clearer in this meeting. Some of the issues we had were mainly due to communication and the initial confusion of setting up the project. Going forward there will need to be more communication


Scrum meeting 2 (4/22):

-Issue Completed: Connection to discord - Sebastian, Jonathan (points: 1)
-Issue Completed: API connection - Sebastian (points: 3)
-Issue Completed: Database setup - Sean Hicks (points: 2)

-Issue Assigned: Create and inform commands - Jonathan (points: 2)
-Issue Assigned: Get Coins - Gigi and Sean (points: 2)
-Issue Assigned: Compare Coins - Sebastian and Jonathon (points: 4)
-Issue Assigned: Add Coins - Gigi and Sean (points: 3)
-Issue Assigned: Parse data - Sean and Sebastian (points: 3)
-Issue Assigned: Timing of receiving data - Sebastian (points: 2)

Further progress:
-All have mongo community to communicate with database locally
-Further add Schema to database
-Basic use case flow:
	-Applying percentage change throughout the day 
	-Inputting and separating user values to the database
	-Pulling from database and returning specific crypto values on users assigned coins

Current progress:
-Have a basic database set up with mongoDB.
-Connection to Cryptocurrency API.
-Gets current price of select crypto using symbols.

Notes:
With the basics set up, progress can continue. Further clarification of the database was needed and hashed out to assign the user with the symbols of the cryptocurrencies they would like to follow. The database will also have to hold the prices at the start of the day, week, and month to compare the prices over time. Further parsing needs to be done with the api in order to get other information the user may want as well since we would like to add a feature to compare coins. With the ability to compare coins, other functions will need to be added as well. All of the features have issues as shown above and have been assigned accordingly. 

Reflection: 
In this iteration, there was definitely a lot of progress made. However, there is an issue of trying to make sure the program as a whole is intertwined. More meetings will have to be done to piece together everything we have been working on. 


Current screenshots:
![StoryBoard](https://user-images.githubusercontent.com/76269922/165013106-eb006b8f-1e80-4ffa-a674-e533156ce15c.png)
![Issues](https://user-images.githubusercontent.com/76269922/165013279-72cb8bed-9f33-44e7-9818-63977f831731.png)
