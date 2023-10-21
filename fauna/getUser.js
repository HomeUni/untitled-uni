import { query, Client } from 'faunadb'
import { FAUNA_SECRET } from './faunaKeys'

const getUser = (email) => {
    const q = query

    const client = new Client({
        secret: FAUNA_SECRET,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    })

    const userQuery = client.query(
        q.Get(q.Match(q.Index('get_user_by_email'), email)
        ))
        .then((ret) => { return ret.data })
        .catch((err) => {
            return null
        })


    if (!userQuery || userQuery === undefined) return null

    return userQuery

}

export default getUser