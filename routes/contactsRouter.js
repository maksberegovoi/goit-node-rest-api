import { contactsController } from '../controllers/contactsControllers.js'
import Router from 'express'
import { AuthMiddleware } from '../shared/http/middlewares/AuthMiddleware.js'

const contactsRouter = Router()

contactsRouter.get('/', AuthMiddleware, contactsController.getAllContacts)
contactsRouter.get('/:id', AuthMiddleware, contactsController.getOneContact)
contactsRouter.delete('/:id', AuthMiddleware, contactsController.deleteContact)
contactsRouter.post('/', AuthMiddleware, contactsController.createContact)
contactsRouter.patch('/:id', AuthMiddleware, contactsController.updateContact)
contactsRouter.patch(
    '/:id/favorite',
    AuthMiddleware,
    contactsController.updateStatusContact
)

export default contactsRouter
