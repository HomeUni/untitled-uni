import { Client, query } from 'faunadb'

import { FAUNA_SECRET } from './faunaKeys'

const createCollection = async (collection) => {
    const q = query
    const client = new Client({ secret: FAUNA_SECRET, })
    
    const createCollectionQuery = client.query(
        q.Get(q.Match(q.Index('get_collection_by_title'), collection.title)
        ))
        .then((ret) => { return 'CollectionExists' })
        .catch((err) => {
            const createCollection = client.query(
                q.Create(q.Collection('collections'), { data: collection })
            )
            return createCollection
        })

    return createCollectionQuery


}

export default createCollection