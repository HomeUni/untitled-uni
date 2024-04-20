import { Client, query } from 'faunadb'

import { FAUNA_SECRET } from './faunaKeys'

export const updateCommentsInBackend = async (updatedComments,id) => {
    const q = query
    const client = new Client({ secret: FAUNA_SECRET, })
    const collectionQuery = await client.query(
        q.Update(q.Select('ref', q.Get(q.Match(q.Index('get_post_by_id'), id))), {
            // data: { ...data }
             data: { comments: updatedComments } 
        })
    )

    if (collectionQuery) return collectionQuery.data

}

export const updateLikesInBackend = async (updatedLikes,id) => {
    const q = query
    const client = new Client({ secret: FAUNA_SECRET, })
    const collectionQuery = await client.query(
        q.Update(q.Select('ref', q.Get(q.Match(q.Index('get_post_by_id'), id))), {
            data: { likes:  updatedLikes}
        })
    )

    if (collectionQuery) return collectionQuery.data
}

