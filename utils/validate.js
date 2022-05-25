import Joi from 'joi';


//required() specifies that this field needs not to be null

//schema for /delete route 
export const deleteSchema = Joi.object({
    contact :Joi.string().required().length(10),
    name : Joi.string().required()
});

//schema for /add route 
export const addSchema = Joi.object({
    contact : Joi.string().length(10).required(),
    name: Joi.string().required()
})

//schema for /update route 
export const updateSchema = Joi.object({
    contact : Joi.string().length(10).required(),
    name: Joi.string().required(),
    newName : Joi.string().required()
})

//schema for /login route 
export const loginSchema = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required()
})

//schema for /findcontact route 
export const findContactSchema = Joi.object({
    contact:Joi.string().required()
})
//schema for /contacts route 
export const contactSchema = Joi.object({
    page:Joi.number().required()
})