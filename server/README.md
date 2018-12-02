# Homelike server for assignment

## Background information

###run
- edit /config/default.json
- provide mongodb connection path [mongodb://localhost:27017/assignment by default]
- npm install
- npm start

###current endpoints
- `/users`
- `/apartments`
- `/locations`
- `/graphql`
- `/graphiql`

##What to do - for backend engineers
1. add new endpoint /countries which should represent the data from the `countries` collection
1. add `countries` to /graphql endpoint
1. add `country` to `locations.graphql.schema` as a representative of `country` information
1. add functionality to use `limit` and `skip` as a parameters to fetch data through `/graphql` endpoint
1. If you run the following query, location will always be `null`. Please figure out why this is happening.
After you found out how this happens, please describe the reason and how you found the issue. 
```query RootQuery($owner: String) {  
      apartments(owner: $owner) {  
        items {  
          location {  
            title  
          }  
        }  
      }  
    }
```  

#### Resolving the last problem and some ideas about how I start thinking about it:

The below steps is what I started to do:

1. I investigated in [apartement.resolver.js] file to see and check if there is any issue within the code or not, but the code looks fine.
2. I started to write console log instead of returning value[result] as the code below, the console log show an empty array/list so my opinion that there is an issue with the query it self.
```
location: (apartment) => {
        return Locations.find({ query: { _id: { "$eq" : apartment.location }}}).then(result=>console.log(result));
      }
```

4. To be more sure about the query, I write it to be executed in mongoDB shell but the result is that I got the document which means that there is somethin in the resolver code.

5. I thought about the `find` functiob so I investigated in to mongoDB inside mongoDB node package [`node-mongodb-native`](https://github.com/mongodb/node-mongodb-native)

6. During my exploration inside the npm package, I opened the [`find - collection.js`](https://github.com/mongodb/node-mongodb-native/blob/v2.2.36/lib/collection.js#L180) and added some console inside it.

7. I found the following from the previous step:
 - [_id] value was changing  as all Uppercase alphapets in [_id] value changed in to lowercase alphapets.
 - Then I checked the [`find`] function and found that [_id] is not changing here, so where it might be changing in.

8. I checked the npm packages installed in [`package.json`] and found that there is [`feathers-mongodb`](https://github.com/feathersjs-ecosystem/feathers-mongodb)

9. I investigated the files of code of [`feathers-mongodb`] to see their [`find`] function which I found it in [`find`](https://github.com/feathersjs-ecosystem/feathers-mongodb/blob/master/lib/index.js) which calls another [`_find`] function where I put some consoles and figure out that [_id] was changing [`here`](https://github.com/feathersjs-ecosystem/feathers-mongodb/blob/v3.0.0/lib/index.js) in line 66 which calls [`_objectifyId`](https://github.com/feathersjs-ecosystem/feathers-mongodb/blob/master/lib/index.js) line 28 that creates new [ObjectID] from the same [_id] value.

10. So from my reading on the internet I found the following:
  - When you create a neww instance of [`ObjectID`] with hexadecimal string, it will store the hexadecimal string to [`buufer`] and while storing it, it converts allthe hexadecimal value to integer with base 16.
  - As we know `a` and `A` are the same in base 16.

11. The solution is to update the database query as I did using [`$eq`] or to update the [`featheres-mongodb`] which nont practical for the task or you can change all [_id] to lower case which also not practical solution.

So I choose to modify the query using [`$eq`]


 


