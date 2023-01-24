import { createHash } from 'crypto'

export const getHash = async (password: string): Promise<string> => {
    const hash = createHash('sha256').update(password).digest('base64')

    return hash
}
