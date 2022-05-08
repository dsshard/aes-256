"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aes256 = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Aes256 {
    constructor(salt, iv) {
        this.salt = salt;
        this.iv = iv || Buffer.from('52f12fd38a0a96408f0ec69bec771eb9', 'hex');
    }
    encrypt(text, password) {
        const key = crypto_1.default.scryptSync(password, this.salt, 32);
        const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, this.iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }
    decrypt(text, password) {
        const key = crypto_1.default.scryptSync(password, this.salt, 32);
        const encryptedText = Buffer.from(text, 'hex');
        const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', key, this.iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}
exports.Aes256 = Aes256;
