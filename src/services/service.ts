import 'isomorphic-fetch'

export interface ContactDetails {
  city: string
  email: string
  id: string
  isActive: boolean
  name: string
  phone: string
  surname: string
}

export interface FilterData {
  name: string
  city: string
  showActiveOnly: boolean
}

export class Service {
  constructor(private endpoint: string) {}

  async getContactsList(): Promise<ContactDetails[]> {
    let response = await fetch(`${this.endpoint}contacts`)

    if (!response.ok) {
      throw new Error('Unable to fetch contacts list')
    }
    return await response.json()
  }

  async getContactDetails(id: string): Promise<ContactDetails> {
    let response = await fetch(`${this.endpoint}contacts/${id}`)

    if (!response.ok) {
      throw new Error('Unable to fetch contacts list')
    }
    return await response.json()
  }
}