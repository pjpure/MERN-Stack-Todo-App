import { User } from '../types';

export const users: User[] = [
    {
        _id: 'a',
        username: '',
        password: '',
    },
    {
        _id: 'b',
        username: 'wanchai',
        password: '123abc',
    },
]

export function signIn(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
        const foundUser = users.find(
            (user) => user.username === username && user.password === password
        )

        setTimeout(() => {
            if (foundUser) {
                resolve(foundUser)
            } else {
                reject('Username or password is invalid')
            }
        }, 3000)
    })
}