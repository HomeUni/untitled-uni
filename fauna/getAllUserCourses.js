import { query, Client } from 'faunadb'
import { FAUNA_SECRET } from './faunaKeys'

const getAllUserCourses = async (id) => {
    const q = query

    const client = new Client({
        secret: FAUNA_SECRET,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    })

    // const userQuery = client.query(
    //     q.Get(q.Match(q.Index('get_all_user_courses'), id)
    //     ))
    //     .then((ret) => { return ret.data })
    //     .catch((err) => {
    //         return null
    //     })
        const usersQuery = client.query(
            q.Map( 
                q.Paginate(q.Match(q.Index('get_all_user_courses'), id)),
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

export default getAllUserCourses