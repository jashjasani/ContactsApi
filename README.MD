
# Contacts API by Jash Jasani

This is an api endpoint with basic CRUD operations in mongo db collection 
created with express. It is loosely coupled (dependency injection) server implementation that is the 
database can be changed in future.





## Tech Stack

**Server:** Node, Express, Jsonwebtoken, MongoDb


## API Reference

#### Get jwt token

```http
  GET /login     
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. (by default jash123)|
| `password` | `string` | **Required**. (by default jash@1911)|



#### Get all contacts

```http
  GET /contacts    - token required in Header Authorization Bearer 
```

| Query params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `Number` | **Required**. for pagination|



#### Add contact

```http
  POST /add         - token required in Header Authorization Bearer 
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contact`      | `string` | **Required**. Phone or mobile number |
| `name`      | `string` | **Required**. Name of the person |

#### Find contact

```http
  POST /findcontact   - token required in Header Authorization Bearer 
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contact`      | `string` | **Required**. Phone or mobile number |

#### Update contact

```http
  POST /update       - token required in Header Authorization Bearer 
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contact`      | `string` | **Required**. Phone or mobile number  |
| `name`      | `string` | **Required**. Old name |
| `newName`      | `string` | **Required**. New name |

#### Delete a contact

```http
  POST /delete       - token required in Header Authorization Bearer 
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contact`      | `string` | **Required**. Phone or mobile number  |
| `name`      | `string` | **Required**. Name  |


## Database model methods 
- ### getContact(Contact)
takes in contact object, retruns a single contact or null
- ### setContact(Contact)
method to add a contact to database, returns the added contact and its _id
- ### getAllContacts(pageNumber,pageSize)
expects pageNumber and pageSize as a parameter
- ### updateContact(contact, newName)
parameters = conatact number and the newName
- ### deleteContact(Contact)
takes Contact object as input parameter
- ### findExactContact(Contact)
it needs the exact same Contact object without _id
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ACCESS_TOKEN` - 64 bit hex string 



## Authors

- [@jashjasani](https://www.github.com/jashjasani)


## Run Locally

Clone the project

```bash
  git clone https://github.com/jashjasani/ContactsApi
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```

