

const mongoose = require('mongoose');

//Map global promice to get rid of warnings
mongoose.Promise = global.Promise;

//connect to db
const db = mongoose.connect("mongodb://localhost:27017/customercli",{useNewUrlParser: true});
mongoose.set('strictQuery', false);

if(db) console.log("connected");

// import model
const Customer = require('./models/customer.js');

// Add customer
const addCustomer = async(req) => {
// console.log(req);
    try{
        const doc = await new Customer(req);
        const data = await doc.save(()=>{
            // console.log(data);
            console.log("Customer Added");
            mongoose.connection.close();
        });
        
        
    }catch(e){
        console.log(e);
    }
}

 // find customer

const findCustomer = (name) =>{
    // make name case insensitive
    const search = new RegExp(name,"i");
    try{
        Customer.find({$or:[{firstname:search},{lastname: search}]})
            .then(customer =>{
                console.info(customer);
                console.info(`${customer.length} matches`);
                mongoose.connection.close();
                
            });
    }catch(e){
        console.log(e);
    }
        
}
//update customer dateils
const updateCustomer = (_id, customer) =>{
    try{
        Customer.updateMany({_id},customer)
        .then(customer => {
            console.log("updated");
            mongoose.connection.close();
                
        })

    }catch(e){
        console.log(e);
    }
}

// remove customer 
const removeCustomer = (_id) =>{
    try{
        Customer.remove({_id})
        .then(customer => {
            console.log("removed");
            mongoose.connection.close();
               
        })

    }catch(e){
        console.log(e);
    }
}

//list all customers
const list = () =>{
    Customer.find()
    .then(customer =>{
        console.log(customer);
        mongoose.connection.close();
    });
}
 // Export all methods
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    list
}


