import { randomUUID } from 'node:crypto'

interface CreateUserProps {
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
  private constructor(private props: UserProps) {}

  static create(input: CreateUserProps): User {
    return new User({
      id: randomUUID(),
      createdAt: new Date(),
      ...input,
    })
  }

  // método para reconstituir dados do banco
  static reconstitute(props: UserProps): User {
    return new User(props)
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
