export const users = [
    {
        id: 'a',
        username: '',
        email: 'somsak@test.com',
        password: '',
    },
    {
        id: 'b',
        username: 'wanchai',
        email: 'wanchai@test.com',
        password: '123abc',
    },
]

export function signIn(username: string, password: string) {
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