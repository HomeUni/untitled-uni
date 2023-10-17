import { Client, query } from 'faunadb'

import { FAUNA_SECRET } from './faunaKeys'

const createUser = async (user) => {
    const q = query

    const client = new Client({ secret: FAUNA_SECRET, })

    const createUserQuery = client.query(
        q.Get(q.Match(q.Index('get_user_by_email'), user.email)
        ))
        .then((ret) => { return 'UserExists' })
        .catch((err) => {
            const createUser = client.query(
                q.Create(q.Collection('users'), { data: user })
            )
            return createUser
        })
    
    return createUserQuery


}

export default createUser