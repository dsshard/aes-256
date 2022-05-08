/// <reference types="node" />
export declare class Aes256 {
    private readonly salt;
    private readonly iv;
    constructor(salt: string, iv: Buffer);
    encrypt(text: string, password: string): string;
    decrypt(text: string, password: string): string;
}
