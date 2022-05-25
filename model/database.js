import { MongoClient } from "mongodb";


const MONGO_URL = "mongodb+srv://adminjash:Cl2qVMCqmRrmDJqC@cluster0.pa7xf.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = "myFirstDatabase";
const COLLECTION_NAME = "contacts";
const client = new MongoClient(MONGO_URL);


//function to get a single matching object whose contact number is same as contact
//retruns a single contact or null
export async function getContact(Contact) {
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        const result = await collection.findOne({contact : Contact.contact});
        return result;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}


//method to add a contact to database 
//returns the added contact and its _id
export async function setContact(Contact) {
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        const result = await collection.insertOne(Contact);
        return result;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}


//method to retrieve all contacts with pagination
//returns an array of documents
export async function getAllContacts(pageNumber,pageSize) {
    try {
        await client.connect()
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        const contacts = await collection.find({}).sort({_id:1}).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray();
        return contacts;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}


//method to update a pre existing contact
//returns updated contact object 
export async function updateContact(contact, newName) {
    try {
        await client.connect()
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        const updatedContact = await collection.findOneAndUpdate({ contact: contact }, { $set: { name: newName } })
        return updatedContact;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}


//method to delete a pre existing contact 
export async function deleteContact(Contact){
    try{
        await client.connect()
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        const deletedContact = await collection.findOneAndDelete(Contact);
        return deletedContact;
    } catch(e){
        console.log(e);
    } finally{
        await client.close();
    }
}


//method to find exactly same contact object
//retruns exactly matching document
export async function findExactContact(Contact) {
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        const result = await collection.findOne(Contact);
        return result;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}