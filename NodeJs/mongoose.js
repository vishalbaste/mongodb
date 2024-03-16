const mongoose = require('mongoose');

class MongoDB
{
    async connect()
    {
        await mongoose.connect('mongodb://127.0.0.1/students');
    }

    async find(modal,filters = {})
    {
        return modal.find(filters);
    }

    async insertOne(modal,record)
    {
        return modal.create(record);
    }

    async insertMany(modal,records)
    {
        return modal.insertMany(records);
    }

    async update(modal,filters = {},data)
    {
        return modal.findOneAndUpdate(filters,data);
    }

    async updateMany(modal,filters = {},data)
    {
        return modal.updateMany(filters,data);
    }
    
    async delete(modal,filters = {})
    {
        return modal.findOneAndDelete(filters);
    }

    async deleteMany(modal,filters = {})
    {
        return modal.deleteMany(filters);
    }
}

const MongooseDB =new MongoDB();

MongooseDB.connect()
.then(async () =>
{
    console.log("Database Connectd Successfully");

    const productSchema =new mongoose.Schema({
        name        :   String,
        company     :   String,
        price       :   Number,
        image       :   String,
        isFeatured  :   Boolean,
        colors      :   [String]
    });

    const Product =new mongoose.model('product',productSchema);

    //A. Search data
    MongooseDB.find(Product)
    .then(result =>
    {
        console.log(result)
    })
    .catch(error => console.log(error));

    //B. Insert One Record
    MongooseDB.insertOne(Product,{
        name        :   "Vivo T1 5G",
        company     :   "Vivo",
        price       :   15000,
        image       :   '',
        isFeatured  :   true
    })
    .then(result =>
    {
        console.log(result)
    })
    .catch(error => console.log(error));

    //C. Insert Many Record
    MongooseDB.insertMany(Product,
    [
        {
            name        :   "Iphone 15",
            company     :   "Apple",
            price       :   75000,
            image       :   '',
            isFeatured  :   true
        },
        {
            name        :   "Vivo T1 5G",
            company     :   "Vivo",
            price       :   15000,
            image       :   '',
            isFeatured  :   true
        },
        {
            name        :   "Oppo A1",
            company     :   "Oppo",
            price       :   17000,
            image       :   '',
            isFeatured  :   true
        }
    ])
    .then(result =>
    {
        console.log(result)
    })
    .catch(error => console.log(error));

    //D. Update Record
    MongooseDB.update(Product,{price : {$eq : 17000}},
    {
        $push   : { colors  : 'Black' }
    })
    .then(result =>
    {
        console.log(result)
    })
    .catch(error => console.log(error));

    //E. Update Many records
    MongooseDB.updateMany(Product,{},
    {
        $set    :   {colors :   ['Black','Red','Green','Blue']}
    })
    .then(result =>
    {
        console.log(result)
    })
    .catch(error => console.log(error));

    //F. Delete one record
    MongooseDB.delete(Product,{price : 15000})
    .then(result =>
    {
        console.log(result)
    })
    .catch(error => console.log(error));

    //G. Delete many records
    MongooseDB.deleteMany(Product,{price : {$gte : 0}})
    .then(result =>
    {
        console.log(result)
    })
    .catch(error => console.log(error));

})
.catch(error => console.log(error));