import { query, Client, Collection } from 'faunadb'
import { FAUNA_SECRET } from './faunaKeys'

const getAllUsers = async () => {
    const q = query
    const { Documents, Paginate, Collections, Lambda, Get } = q

    const client = new Client({
        secret: FAUNA_SECRET,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    })

    const lessonsQuery = client.query(
        q.Map(
            Paginate(Documents(Collection('lessons'))),
            Lambda(x => Get(x)))

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