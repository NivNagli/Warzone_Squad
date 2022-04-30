/* This file is in charge of initiate the redis connection and to the monkey patch for the mongoose Query,
 * we are adding the the Query prototype a new method which called 'cache' that will help us to mark the queries that we want to cache.
 * We also edit the implementation of the 'exec' method which will use the boolean flag which we set with the 'cache' method to determine if we should cache the results
 * of the query execute or we should run the default execute which not store the result in the cache.
 * 
 * There is also another method which we are not using right now which we export that will clean queries from the cache according to their key.
 * */


const mongoose = require('mongoose');
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

const connectClient = async (client) => {
    /* Because that in the new version the connect to the redis server is asynchronous, i need to create async function
     * to initiate the connection with the 'await' syntax. */
    return await client.connect();
}
connectClient(client);

// Deep copy the original 'exec' function from the prototype object
const exec = mongoose.Query.prototype.exec;


mongoose.Query.prototype.cache = function (options = {}) {
    /* Here we extend the Query prototype with new custom method,
     * this method will mark this query as one that needed to be cached with
     * the custom field that we add: 'useCache' boolean flag that we are adding to her.
     * and also we set our custom 'hashKey' field for the query object which will use
     * us to determine to which user the query is relevant [in the notion file 
     * there is full description for the cache design] that relevant for this custom 'hashKey' 
     * field that we added */
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');

    // We return 'this' because we want this method to be able to chained to another methods
    // like q.cache().anotherMethod();
    return this;
};
// We need to use the function() syntax instead of the bullet syntax because we want to use the 'this' save word
mongoose.Query.prototype.exec = async function () {
    // Here we override the original 'exec' function from the Query prototype
    // we will use here the original function that we saved in the 'exec' variable in the beginning of the code
    // First we check if we mark this query as wanted query to cache.
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    // The case we using caching for this query:

    /* Creating the key according to the getQuery parameters and the collection name
     * that we are accessing into, we using the Object.assign method in order to make new object
     * with deep copy, and after we create the new key we stringify him because
     * redis can save only string type objects! 
     * And in that way we are creating a uniq keys for the redis hash.*/
    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    );

    // See if we have a value for 'key' in redis
    const cacheValue = await client.get(key);

    // If we do, return that
    if (cacheValue) {
        console.log("Pulling data from redis cache");
        const doc = JSON.parse(cacheValue);
        /* Here we return the mongodb model or the array of mongodb models depends on which one
         * of them we are required to return.
         * To access the mongodb model builder of the current collection which we query
         * we are using the method 'this.model' which return for us the requested model type which
         * we can use for access the model builder. */
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    // Otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments);
    if (result) {
        const cacheExpiration = 60*60*5;
        console.log("saving new data to the redis cache");
        await client.set(key, JSON.stringify(result), {
            EX: cacheExpiration,
        });
    }
    return result;
};

// We export 'ClearHash; function which responsible for delete data 
// from the cache according some key, this function will use in the
// middleware file "cleanCache.js"
module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
};