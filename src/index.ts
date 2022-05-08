import crypto from 'crypto'

export class Aes256 {
  private readonly salt: string;
  private readonly iv: Buffer;

  constructor (salt: string, iv?: Buffer) {
    this.salt = salt
    this.iv = iv || Buffer.from('52f12fd38a0a96408f0ec69bec771eb9', 'hex')
  }

  encrypt (text: string, password: string): string {
    const key = crypto.scryptSync(password, this.salt, 32)
    const cipher = crypto.createCipheriv('aes-256-cbc', key, this.iv)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
  }

  decrypt (text: string, password: string): string {
    const key = crypto.scryptSync(password, this.salt, 32)
    const encryptedText = Buffer.from(text, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, this.iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  }
}
