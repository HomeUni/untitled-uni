import { Client, query } from 'faunadb'

import { FAUNA_SECRET } from './faunaKeys'

const updateCollection = async (collection) => {
    const q = query
    const client = new Client({ secret: FAUNA_SECRET, })
    const collectionQuery = await client.query(
        q.Update(q.Select('ref', q.Get(q.Match(q.Index('get_collection_by_title'), collection.title))), {
            data: { ...collection }
        })
    )

    if (collectionQuery) return collectionQuery.data

}

export default updateCollection