import { query, Client, Collection } from 'faunadb'
import { FAUNA_SECRET } from './faunaKeys'

const getPosts = async () => {
    const q = query
    const { Documents, Paginate, Lambda, Get } = q

    const client = new Client({
        secret: FAUNA_SECRET,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    })

    const postsQuery = client.query(
        q.Map(
            Paginate(Documents(Collection('posts'))),
            Lambda(x => Get(x)))

    )
    .then((ret) => { return ret.data })
    .catch((err) => {
        return null
    }
    )

    if (!postsQuery || postsQuery === undefined) return null

    return postsQuery

}

export default getPosts