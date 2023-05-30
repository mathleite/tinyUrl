import crypto from 'crypto';

export default class Hash {
    static generate(inputString: string): string {
        const minLength = 5;
        const maxLength = 10;
        const hash = crypto.createHash('md5').update(inputString).digest('hex');
        const hashLength = Math.max(minLength, Math.min(maxLength, inputString.length));
        return hash.substr(0, hashLength);
    }
}