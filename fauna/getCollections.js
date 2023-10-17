import { query, Client } from 'faunadb'
import { FAUNA_SECRET } from './faunaKeys'

const getAllCollections = async () => {
    const q = query

    const client = new Client({
        secret: FAUNA_SECRET,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    })

    const usersQuery = client.query(
        q.Map( 
            q.Paginate(q.Match(q.Index('all_collections'))),
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

export default getAllCollections