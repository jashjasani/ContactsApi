import express from 'express'
import { JWT } from 'node-jsonwebtoken'
import 'dotenv/config'
import { auth } from './utils/verify.js'
import { deleteSchema, loginSchema, updateSchema, addSchema, findContactSchema, contactSchema } from './utils/validate.js'


export async function makeApp(database) {


    const app = express();


    //jsonwebtoken instance
    //helps creating a jwt token 
    //process.env.ACCESS_TOKEN is the secret key which is stored in .env file
    const jwt = new JWT(process.env.ACCESS_TOKEN);


    //specifies app to use json format
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //route to get all contacts with pagination 
    //pageNumber has to be specified 
    //default pageSize = 5
    //GET route 
    app.get('/contacts', auth, async (req, res) => {
        try {
            let value = await contactSchema.validateAsync(req.query);
            let pageNumber = req.query.page;
            const pageSize = 5;
            let contacts = await database.getAllContacts(pageNumber, pageSize);
            if (contacts.length > 0) {
                res.json(contacts);
            } else {
                res.send("No more contacts add some contacts")
            }
        } catch (e) {
           res.send(e.details[0].message+" in query params");
        }


    })


    // route to add new contact 
    // only if there exists no contact with same contact number
    // POST route 
    app.post('/add', auth, async (req, res) => {
        try {
            let value = await addSchema.validateAsync(req.body);
            const Contact = {
                contact: req.body.contact,
                name: req.body.name
            }
            if (await database.getContact(Contact) == null) {
                let isAdded = await database.setContact(Contact);
                if (isAdded.acknowledged) {
                    res.send('Successfully contact added');
                } else {
                    res.send('Error in adding contact');
                }
            } else {
                res.send('Contact already exists')
            }
        } catch (e) {
            res.send(e.details[0].message)
        }


    })


    //route to update a pre existing contact 
    //if there's no such contact 
    //it returns No such contact
    //for successful update it returns Contact updated
    //POST route 
    app.post('/update', auth, async (req, res) => {
        try {
            let value = await updateSchema.validateAsync(req.body);
            const contact = req.body.contact;
            const name = req.body.name;
            const newName = req.body.newName;
            const Contact = {
                contact: contact,
                name: name
            }


            const doesExist = await database.getContact(Contact);
            if (doesExist != null) {
                const result = await database.updateContact(contact, newName);
                res.send("Contact updated")
            } else {
                res.send("No such contact");
            }
        } catch (e) {
            res.send(e.details[0].message);
        }

    })


    //route to get a jwt token 
    //the default username is jash123 and default password is jash@1911
    //on entering correct credentials it returns jwt token
    //POST route 
    app.post('/login', async (req, res) => {
        try {
            let value = await loginSchema.validateAsync(req.body);
            const user = {
                username: req.body.username,
                password: req.body.password
            }
            if (user.username == 'jash123' && user.password == 'jash@1911') {
                const generateToken = await jwt.sign(user);
                res.send(generateToken)
            } else {
                res.send("Incorrect password or username")
            }
        } catch (e) {
            res.send(e.details[0].message)
        }

    })


    //route to delete a pre existing contact
    //if there's no pre existing contact 
    //it returns no such contact
    //POST route 
    app.post('/delete', auth, async (req, res) => {
        try {
            let value = await deleteSchema.validateAsync(req.body)
            const Contact = {
                contact: req.body.contact,
                name: req.body.name
            }
            if (await database.findExactContact(Contact) != null) {
                let isDeleted = await database.deleteContact(Contact);
                console.log(isDeleted);
                if (isDeleted != null) {
                    res.send('Successfully deleted');
                } else {
                    res.send('Error in deleting contact');
                }
            } else {
                res.send("No match found to be deleted")
            }

        } catch (e) {
            res.send(e.details[0].message);
        }

    })

    //route to find a single contact with matching number
    //if there's no pre existing contact 
    //it returns no such found
    //POST route 
    app.post('/findcontact', auth, async (req, res) => {
        try {
            let value = await findContactSchema.validateAsync(req.body);
            const Contact = {
                contact: req.body.contact
            }
            let contact = await database.getContact(Contact)
            if (contact != null) {
                res.send(contact)
            } else {
                res.send("No contact found")
            }
        } catch (e) {
            res.send(e.details[0].message);
        }
    })

    return app;
}
