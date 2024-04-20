import { Client, query } from 'faunadb'

import { FAUNA_SECRET } from './faunaKeys'

const createPost = async (postData) => {
    const q = query

    const client = new Client({ secret: FAUNA_SECRET, })

    try {
        const createdPost = await client.query(
            q.Create(
                q.Collection('posts'),
                { data: postData }
            )
        );
        return createdPost;

    } catch (error) {
        return 'Error creating post: ' + error.message;
    }


}

export default createPost