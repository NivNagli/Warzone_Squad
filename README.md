# WarzoneSquad - Web app, for the game Of Call Of Duty Warzone: 

Offical Site URL : [https://xwarzonesquad.web.app/](https://xwarzonesquad.web.app/)

Video Of Using The site : [https://www.youtube.com/watch?v=XBCXhU4JKww&ab_channel=IsrGunner](https://www.youtube.com/watch?v=XBCXhU4JKww&ab_channel=IsrGunner) 


---

## ***General design && description***:

***WarzoneSquad designed to give the users a convenient way to track their and their friends stats in the popular call of duty warzone game,
The site contains “public” services that are available to all users and "protected" services that are only available to registered users.***

***The data presented to the users is based on their last 100 games which comes originally from the official api of the game, and after we sort it we displayed the stats for the user who performed the search, in the first time when the user uses the site we extract all the relevant information about him from the official api of the game and store it in our server which create a kind of proxy so that in the next searches of the user the search action will be performed much faster.***

***In addition we have middlewares that we have created that are responsible to perform within a specificied time period an attempt to update the users data in the database, we take care to update it in our proxy database so that the user has the latest information.**

---

## ***Technologies used:***

- **NodeJS**
- **React**
- **Redux**
- **MongoDB**
- **Express**

---

## ***UML [general structure of the flow in the site]:***

### ***Unrecognized user:***

![newUserFlow](https://user-images.githubusercontent.com/75484097/161963689-b8984cd2-adbf-40aa-89d3-f31722a1d993.png)

***For a player who has not previously searched for his data on the site we will need to send a request to the official api of the game and from it response we will extract the relevant data to us and save it in our database and after we have done this we will return the stats to the server side that will present them to the user.***

### Recognized user:

![vetUserFlow](https://user-images.githubusercontent.com/75484097/161963727-0e6f1f51-6413-4aaa-bf0a-6c7c7f903411.png)

***After a user searches for his data in the site, we keep in the database the relevant data of him, therefore in the next time he uses the site we do not need to send request to the official server of the game api, and the data is kept in an orderly manner that suitable for the use on the client side.***

### ***Update our database:***

![updateFlow](https://user-images.githubusercontent.com/75484097/161963781-b355a6b7-aa1f-4deb-bedb-855133b52973.png)

***In order the prevent the need of sending request each time a recognized user perform a search for his stats, we using our database as a proxy server for the user data but in order to supply the up to date stats we need to make a update procedure on our database which will occour in a defined time interval.***

***In the procedure we will check when the last update performed for the user and if the the specified period has elapsed it will send a request to the official api and will make a comparision between the data that stored in our database to the data that returned from the response and will update the database data in case we found a new data in the response.***

---

## Database models:

![databaseModels](https://user-images.githubusercontent.com/75484097/161963808-f0926d5c-43c7-48ec-a703-ec8cc51ac2c8.png)

### User.js - model for registered users of the site:

- ***email, password : This fields are for the authentication stage, the password stored encrypted in order not to expose them in case of database leak.***
- ***username, platform : This fields are verified in the registration stage that they do belong to a user with a public profile in the game.***
- ***gameProfile : This field contain the “warzoneUser” ID from the database, in the registration process if a search has not previously been performed for the player profile on our site, we create a new one and if it exists we attach his ID number in the database to the signed user model.***
- ***squads : This field contain ‘warzoneSquad’ ID’s array for registered users we have created the option to create a squad in order so that the user can easily track his and his friends' shared data.***

### warzoneUser.js - model for a player who has successfully searched in the site:

- ***username, platform : This are the player details which been searched on the site.***
- ***lastGamesStats : An object array with 100 objects which contain in each object a short details about the player stats in specific game includes the game's ID numbers so we can direct the user to the game's display page if he wants to.***
- ***generalStats : An object which contain 2 major fields, the first one is ‘br_lifetime_data’ which contain the player lifetime data on the “battle-royal” mode, and the second one is “weeklyStats” which contain the player stats of the past week.***
- ***lastTimeUpdated : In order to monitor the updates cycle to avoid a situation that we are constantly trying to update the same profiles although that almost no time has passed since they were last updated we using this field to know whether we should try to update his stats or not.***
- ***updateStats() : This method will be executed by the “update-db.js” middleware which pulls out the warzoneUsers which has passed long enough time since their last update attempt and she will preform the procedure of the update attempting for the user data in our database in relation to the data we received from the official api.***

### warzoneSquad.js - model that created for the registered users only:

- ***playersSharedGamesStasts : Array that contain objects which each object contain short details from the shared games stats of one of the players in the squad.***
- ***sharedGamesGeneralStats : Array that contain objects which each object conatin short details about the entire squad in spesefic shared game.***
- ***All the other fields : pretty similar to the ‘warzoneUser.js’ fields but this time created for the “warzoneSquad” model.***

### warzoneGame.js - model that created for a match who has successfully searched in the site:

***This model created when a user preform a search for specific match, becuase this object contains a lot of data we have created in the update-db middleware a method which delete all the objects in the database if they not searched for more then 12 hours and that why we need the ‘lastToched’ field.***
