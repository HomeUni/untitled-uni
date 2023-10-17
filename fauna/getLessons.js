import { query, Client } from 'faunadb'
import { FAUNA_SECRET } from './faunaKeys'

const getAllUsers = async () => {
    const q = query

    const client = new Client({
        secret: FAUNA_SECRET,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    })

    const lessonsQuery = client.query(
        q.Map( 
            q.Paginate(q.Match(q.Index('all_lessons'))),
            q.Lambda(x => q.Get(x))
        )
    )
    .then((ret) => { return ret.data })
    .catch((err) => {
        return null
    }
    )

    if (!lessonsQuery || lessonsQuery === undefined) return null

    return lessonsQuery

}

export default getAllUsers