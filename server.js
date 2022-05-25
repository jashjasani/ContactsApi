import { makeApp } from "./app.js";
import * as database from './model/database.js';


//returns an express app 
//the database is pased as dependency injection
//it is an async function 
let app = await makeApp(database);


//starts server on port 3000
app.listen(3000,()=>{
    console.log('Server started on port 3000');
})

