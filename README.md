# WarzoneSquad - Web app
Offical Site URL : [https://xwarzonesquad.web.app/](https://xwarzonesquad.web.app/)

---

## ***Technologies used && Services***:

![siteMap.png](readme%20(1)%20d20e353290fd41de9eae857a44884014/siteMap.png)

***Technologies used:***

- **NodeJS**
- **React**
- **Redux**
- **MongoDB**
- **Express**

---

### General description:

WarzoneSquad designed to give the users a convenient way to track their and their friends stats in the popular call of duty warzone game,
The site contains “public” services that are available to all users and "protected" services that are only available to registered users.

The data presented to the users is based on their last 100 games which comes originally from the official api of the game.

---

## Design [Backend]:

### Communication with the official API:

On the server side I decided to set up an API in the structure of an Adapter design pattern that will assist us between the requests we receive from the client side to the official API of the game provider, this is instead of using in the other services directly in the official api.

The reason I chose this design pattern is because activision's official api requires authentication and because there is no official documentation about it and the information it returns is very general and messy. And I wanted to have a convenient way for the information structure thats comes back to me, plus I wanted the option to define for myself the type of errors that are received for the requests from the official API and not use their errors messages.

The services who are responsible for implementing this pattern are pullFromActivision.js whose job is to perform the direct communication with the official API, and extractFromActivision.js whose job it is to filter the relevant information from the response which is returned to him from pullFromActivision service, and in case of error to define the error message.

![Adapter.png](readme%20(1)%20d20e353290fd41de9eae857a44884014/Adapter.png)

### The Proxy Pattern:

Because we are limited in the use of the official API i needed for a creative way to lower the number request ‘s between us to the official API, i decided that our server will act like a Proxy server to the official API server.

I did that by storing the data that comes back to us from the official server after he cleaned by the Adapter services, the data will saved within models that will be stored in our database that will fit into the configuration in which we recive him.

Now the next time a user searches for his information we will identify on the server side that we already have his information in  and retrieve it directly from our database and thus we will save repeated requests to the game provider's server.

***Unrecognized user:***

For a player who has not previously searched for his data on the site we will need to send a request to the official api of the game and from it response we will extract the relevant data to us and save it in our database and after we have done this we will return the stats to the server side that will present them to the user.

![newUserFlow.png](readme%20(1)%20d20e353290fd41de9eae857a44884014/newUserFlow.png)

***Recognized user:***

After a user searches for his data in the site, we keep in the database the relevant data of him, therefore in the next time he uses the site we do not need to send request to the official server of the game api, and the data is kept in an orderly manner that suitable for the use on the client side.

![vetUserFlow.png](readme%20(1)%20d20e353290fd41de9eae857a44884014/vetUserFlow.png)

### Now how the data in our proxy server will be up to date?

In order the prevent the need of sending request each time a recognized user perform a search for his stats, we using our database as a proxy server for the user data.

**but** in order to supply the up to date stats we need to make a update procedure on our database which will occour in a defined time interval.

In the procedure we will check when the last update performed for the user and if the the specified period has elapsed it will send a request to the official api and will make a comparision between the data that stored in our database to the data that returned from the response and will update the database data in case we found a new data in the response.

The update attempt will only be performed for users whose the pre-defined period of time has elapsed since their last update has passed!

In order to schedule the services that responsible for the update operation in different sub-processes I used the cron library.

![Screen Shot 2022-04-06 at 0.42.39.png](readme%20(1)%20d20e353290fd41de9eae857a44884014/Screen_Shot_2022-04-06_at_0.42.39.png)

### The caching system:

In order to relieve the load in the database i chose to implement a caching system via Redis server, 

i initiate the redis connection and then implement the monkey patch for the mongoose Query object by adding to the Query prototype a new method which called 'cache' that will help us to mark the queries that we want to cache,

after the ‘cache’ function implemention i edit the implementation of the 'exec' method which will use the boolean flag (which we set with the 'cache') method to determine if we should cache the results of the query execute or we should run the default execute which not store the result in the cache.

### General flow chart of retrieving the data from the backend:

![GeneralUml.png](readme%20(1)%20d20e353290fd41de9eae857a44884014/GeneralUml.png)

---

## Database models:

![Screen Shot 2022-04-06 at 13.49.39.png](readme%20(1)%20d20e353290fd41de9eae857a44884014/Screen_Shot_2022-04-06_at_13.49.39.png)

### User.js - model for registered users of the site:

- ***email, password :*** This fields are for the authentication stage, the password stored encrypted in order not to expose them in case of database leak.
- ***username, platform :*** This fields are verified in the registration stage that they do belong to a user with a public profile in the game.
- ***gameProfile :*** This field contain the “warzoneUser” ID from the database, in the registration process if a search has not previously been performed for the player profile on our site, we create a new one and if it exists we attach his ID number in the database to the signed user model.
- ***squads :*** This field contain ‘warzoneSquad’ ID’s array for registered users we have created the option to create a squad in order so that the user can easily track his and his friends' shared data.

### warzoneUser.js - model for a player who has successfully searched in the site:

- ***username, platform :*** This are the player details which been searched on the site.
- ***lastGamesStats :*** An object array with 100 objects which contain in each object a short details about the player stats in specific game includes the game's ID numbers so we can direct the user to the game's display page if he wants to.
- ***generalStats :*** An object which contain 2 major fields, the first one is ‘br_lifetime_data’ which contain the player lifetime data on the “battle-royal” mode, and the second one is “weeklyStats” which contain the player stats of the past week.
- ***lastTimeUpdated :*** In order to monitor the updates cycle to avoid a situation that we are constantly trying to update the same profiles although that almost no time has passed since they were last updated we using this field to know whether we should try to update his stats or not.
- ***updateStats() :*** This method will be executed by the “update-db.js” middleware which pulls out the warzoneUsers which has passed long enough time since their last update attempt and she will preform the procedure of the update attempting for the user data in our database in relation to the data we received from the official api.

### warzoneSquad.js - model that created for the registered users only:

- ***playersSharedGamesStasts :*** Array that contain objects which each object contain short details from the shared games stats of one of the players in the squad.
- ***sharedGamesGeneralStats :*** Array that contain objects which each object conatin short details about the entire squad in spesefic shared game.
- ***All the other fields :*** pretty similar to the ‘warzoneUser.js’ fields but this time created for the “warzoneSquad” model.

### warzoneGame.js - model that created for a match who has successfully searched in the site:

This model created when a user preform a search for specific match, becuase this object contains a lot of data we have created in the update-db middleware a method which delete all the objects in the database if they not searched for more then 12 hours and that why we need the ‘lastToched’ field.

---

### General structure of the code:

![Backend.png](readme%20(1)%20d20e353290fd41de9eae857a44884014/Backend.png)