import ApiError from '../shared/http/errors/api-error.js'
import { Contact } from '../db/models/index.js'

class ContactsService {
    async listContacts(userId) {
        return await Contact.findAll({
            where: { owner: userId }
        })
    }

    async getContactById(id, userId) {
        const contact = await Contact.findOne({
            where: { id, owner: userId }
        })

        if (!contact) throw ApiError.notFound('Not found')
        return contact
    }

    async removeContact(id, userId) {
        const contact = await Contact.findOne({
            where: { id, owner: userId }
        })
        if (!contact) throw ApiError.notFound('Contact not found')

        await contact.destroy()
        return { message: 'Contact successfully deleted' }
    }

    async addContact(data, userId) {
        const { email, name, phone } = data
        const existing = await Contact.findOne({
            where: { email, owner: userId }
        })
        if (existing)
            throw ApiError.badRequest(
                'Contact with this email has already exist'
            )

        const contact = await Contact.create({
            name,
            email,
            phone,
            owner: userId
        })

        return contact
    }

    async updateContact(id, data, userId) {
        const contact = await Contact.findOne({
            where: { id, owner: userId }
        })

        if (!contact) throw ApiError.notFound('Contact has not found')
        await contact.update(data)

        return contact
    }

    async updateStatusContact(id, data, userId) {
        const contact = await Contact.findOne({
            where: { id, owner: userId }
        })

        if (!contact) throw ApiError.notFound('Contact has not found')
        await contact.update({
            favorite: data.favorite
        })

        return contact
    }
}

export default ContactsService
