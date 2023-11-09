import { query, Client } from 'faunadb'
import { FAUNA_SECRET } from './faunaKeys'

const getCoursesByCategory = async(category) => {
    const q = query

    const client = new Client({
        secret: FAUNA_SECRET,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    })

    try {
        const result = await client.query(
            q.Map( 
                q.Paginate(q.Match(q.Index('courses_by_collection'), category)),
                q.Lambda(x => q.Get(x))
            )
        );
    
        return result.data;
      } catch (error) {
        console.error('Error querying documents by category:', error);
        return null;
      }


}

export default getCoursesByCategory