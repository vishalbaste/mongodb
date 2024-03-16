const { MongoClient } = require("mongodb");
const ConnectionUrl = 'mongodb://127.0.0.1';
const Client =new MongoClient(ConnectionUrl);

class Mongo
{
    async init()
    {
        await Client.connect();
        return this.DB = Client.db('students');
    }

    async find(collection,filters = {})
    {
        return await collection.find(filters).toArray();
    }

    async insertOne(collection,data)
    {
        return collection.insertOne(data);
    }

    async insertMany(collection,data)
    {
        return collection.insertMany(data);
    }

    async update(collection,filters,data)
    {
        return collection.updateOne(filters,data);
    }

    async updateMany(collection,filter,data)
    {
        return collection.updateMany(filter,data);
    }

    async delete(collection,filters = {})
    {
        return collection.deleteOne(filters);
    }

    async deleteMany(collection,filters = {})
    {
        return collection.deleteMany(filters);
    }
}


const MongoDB =new Mongo();

MongoDB.init()
.then(async DB =>
{
    // console.log("Database Connected Successfully");
    const dataCollection = DB.collection('data');
    // const data = await dataCollection.find().toArray();
    // console.log(data);

    /* CRUD Oprations using NodeJs and MongoDB */

    //? Insert Multiple Records
    MongoDB.insertOne(dataCollection,{
        name        :   "Vishal Baste",
        age         :   22,
        profession  :   "Software Developer",
        degree      :   ["MCA","BCOM"],
        cources     :   ["Tally ERP 9","Advance Excel","MS-CIT","PMG Disha"]
    })
    .then(({acknowledged}) =>
    {
        if(acknowledged) console.log("Document Inserted");
    })
    .catch(error => console.log(error));

    //?Insert Many Records
    MongoDB.insertMany(dataCollection,[
        {
            name        :   "Yogesh",
            age         :   20,
            profession  :   "Businessman",
            degree      :   ["BCOM"],
            cources     :   ["Tally ERP 9","Advance Excel","MS-CIT","PMG Disha"]
        },
        {
            name        :   "Praduman",
            age         :   20,
            profession  :   "Student",
            degree      :   ["BCOM","MCOM"],
            cources     :   ["Tally ERP 9","MS-CIT"]
        }
    ])
    .then(({acknowledged,insertedCount}) =>
    {
        if(acknowledged) console.log(`${insertedCount} document inserted successfully`);
    })
    .catch(error => console.log(error));

    //? Update Data
    MongoDB.update(dataCollection,{name : "Vishal Baste"},{$set : {name : "Vishal"}})
    .then(result =>
    {
        console.log(result)
    })
    .catch(error => console.log(error));

    //? Update Many Records
    MongoDB.updateMany(dataCollection,{age :{$gt : 10}},{$set : {MaritalStatus : "Singal"}})
    .then(result => 
    {
        console.log(result);
    })
    .catch(error => console.log(error));

    //? Delete one record
    MongoDB.delete(dataCollection,{name : "Vishal"})
    .then(result => console.log(result))
    .catch(error => console.log(error));

    //? Delete Many Records
    MongoDB.deleteMany(dataCollection,{
        $expr   :
        {
            $lt :
                [{
                    $multiply   :   ["$age",2]   
                },50]
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log(error));
    
    //? Search Data
    MongoDB.find(dataCollection)
    .then(data => console.log(data))
    .catch(error => console.log(error));
})
.catch((error)=>
{
    console.log(error);
})
.finally(()=>
{
    console.log("Need to close connection");
    // Client.close();
});