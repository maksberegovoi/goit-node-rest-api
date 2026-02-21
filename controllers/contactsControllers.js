import ContactsService from '../services/contactsServices.js'
import {
    createContactSchema,
    updateContactSchema,
    updateStatusContactSchema
} from '../schemas/contactsSchemas.js'

class ContactsController {
    constructor() {
        this.contactsService = new ContactsService()
    }

    getAllContacts = async (req, res) => {
        const contacts = await this.contactsService.listContacts()
        res.status(200).json(contacts)
    }

    getOneContact = async (req, res) => {
        const { id } = req.params

        const contact = await this.contactsService.getContactById(id)

        res.status(200).json(contact)
    }

    deleteContact = async (req, res) => {
        const { id } = req.params

        const contact = await this.contactsService.removeContact(id)

        res.status(200).json(contact)
    }

    createContact = async (req, res) => {
        const body = await createContactSchema.validateAsync(req.body)
        const newContact = await this.contactsService.addContact(body)

        res.status(201).json(newContact)
    }

    updateContact = async (req, res) => {
        const { id } = req.params
        const body = await updateContactSchema.validateAsync(req.body)

        const updatedContact = await this.contactsService.updateContact(
            id,
            body
        )

        res.status(200).json(updatedContact)
    }

    updateStatusContact = async (req, res) => {
        const { id } = req.params
        const body = await updateStatusContactSchema.validateAsync(req.body)

        const contact = await this.contactsService.updateStatusContact(id, body)

        res.status(200).json(contact)
    }
}

export const contactsController = new ContactsController()
