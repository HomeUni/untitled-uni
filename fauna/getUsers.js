import { query, Client } from 'faunadb'
import { FAUNA_SECRET } from './faunaKeys'

const getAllUsers = async (email) => {
    const q = query

    const client = new Client({
        secret: FAUNA_SECRET,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    })

    const usersQuery = client.query(
        q.Map( 
            q.Paginate(q.Match(q.Index('all_users'))),
            q.Lambda(x => q.Get(x))
        )
    )
    .then((ret) => { return ret.data })
    .catch((err) => {
        return null
    }
    )

    if (!usersQuery || usersQuery === undefined) return null

    return usersQuery

}

export default getAllUsers