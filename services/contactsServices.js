import { nanoid } from 'nanoid'
import ApiError from '../shared/http/errors/api-error.js'
import { Contact } from '../db/models/index.js'

class ContactsService {
    async listContacts() {
        return await Contact.findAll()
    }

    async getContactById(id) {
        const contact = await Contact.findOne({
            where: { id }
        })

        if (!contact) throw ApiError.notFound('Not found')
        return contact
    }

    async removeContact(id) {
        const contact = await Contact.findOne({
            where: { id }
        })
        if (!contact) throw ApiError.notFound('Contact not found')

        await contact.destroy()
        return { message: 'Contact successfully deleted' }
    }

    async addContact({ name, email, phone }) {
        const existing = await Contact.findOne({
            where: { email }
        })
        if (existing)
            throw ApiError.badRequest(
                'Contact with this email has already exist'
            )

        const contact = await Contact.create({
            name,
            email,
            phone
        })

        return contact
    }

    async updateContact(id, data) {
        const contact = await Contact.findOne({
            where: { id }
        })

        if (!contact) throw ApiError.notFound('Contact has not found')
        await contact.update(data)

        return contact
    }

    async updateStatusContact(id, data) {
        const contact = await Contact.findOne({
            where: { id }
        })

        if (!contact) throw ApiError.notFound('Contact has not found')
        await contact.update({
            favorite: data.favorite
        })

        return contact
    }
}

export default ContactsService
