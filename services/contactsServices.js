import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
import ApiError from "../shared/http/errors/api-error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

const readContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

class ContactsService {
  async listContacts() {
    return await readContacts();
  }

  async getContactById(id) {
    const contacts = await readContacts();
    const contact =  contacts.find(c => c.id === id)

    if (!contact) throw ApiError.notFound('Not found')
    return contact
  }

  async removeContact(id) {
    const contacts = await readContacts();
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) throw ApiError.notFound('Not found')

    const [removed] = contacts.splice(index, 1);
    await writeContacts(contacts);
    return removed;
  }

  async addContact({ name, email, phone }) {
    const contacts = await readContacts();

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    const existing = contacts.find(c => c.email === email)
    if (existing) throw ApiError.conflict('Contact with this email  has already exist')

    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
  }

  async updateContact(id, data) {
    const contacts = await readContacts();
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) throw ApiError.notFound('Not found')

    contacts[index] = { ...contacts[index], ...data };
    await writeContacts(contacts);

    return contacts[index];
  }
}

export default ContactsService;
