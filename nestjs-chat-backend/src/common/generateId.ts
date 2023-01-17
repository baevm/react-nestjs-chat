import { customAlphabet } from 'nanoid'

const generateId = (prefix?: string, length = 11) => {
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', length)
  const id = nanoid()

  return prefix ? `${prefix}-${id}` : id
}

export default generateId
