#!/usr/bin/env node
// telling os to run application in node environment

const SuppressWarnings = require("suppress-warnings");
SuppressWarnings([
    // warning can be an Error object or a string
    // name is always a string (can be absent)
    // I really don't know what ctor is, but it's in the ts definition
    (warning, name, ctor) => name === "DeprecationWarning" && warning.toString() === "OutgoingMessage.prototype._headers is deprecated"
]);
const program = require('commander')
const{ addCustomer,findCustomer, updateCustomer,removeCustomer,list} = require('./connect')
const {prompt} = require('inquirer')

const questions = [
    {
        type: "input",
        name: "firstname",
        message: "customer first name"
    },
    {
        type: "input",
        name: "lastname",
        message: "customer last name"
    },
    {
        type: "input",
        name: "phoneno",
        message: "customer Phone number"
    },
    {
        type: "input",
        name: "email",
        message: "customer email"
    },
];

program
    .version("1.0.0")
    .description("Client Managment System")

    // add command----------------------------------------------------------------------------------------------------------------------- 
// program
//     .command('add <firstname> <lastname> <phone> <email>')
//     .alias('a')
//     .description("add customer")
//     .action((firstname,lastname,phoneno,email) =>{
//         addCustomer({firstname,lastname,phoneno,email});
//     });
program
    .command('add')
    .alias('a')
    .description("add customer")
    .action(() =>{
      prompt(questions).then(answers => addCustomer(answers));
    });

    // find command---------------------------------------------------------------------------------------------------------------------------- 
program
    .command("find <name>")
    .alias("f")
    .description("find customer by name")
    .action((name) => findCustomer(name));
    
 // updte command------------------------------------------------------------------------------------------------------------------------------
 program
    .command('update <_id>')
    .alias('u')
    .description("update customer")
    .action((_id) =>{
    prompt(questions).then(answers => {console.log(answers); updateCustomer(_id, answers);});
    });
// remove customers--------------------------------------------------------------------------------------------------------------------------------
program
    .command('remove <_id>')
    .alias('r')
    .description("remove customer")
    .action(_id =>removeCustomer(_id));

// list all customers--------------------------------------------------------------------------------------------------------------------------
program
    .command('list')
    .alias('l')
    .description("list of all customer")
    .action(() =>{
        list();
    });

program.parse(process.argv); ////????????????????



