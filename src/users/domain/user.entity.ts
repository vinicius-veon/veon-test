import { randomUUID } from 'node:crypto'

interface UserRequest {
  name: string
  email: string
  phone?: string
}

interface UserProps {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: Date
}

export class User {
  private props: UserProps

  constructor(request: UserRequest) {
    this.props = {
      id: randomUUID(),
      createdAt: new Date(),
      ...request,
    }
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string | undefined) {
    this.props.phone = phone
  }

  get createdAt() {
    return this.props.createdAt
  }
}
