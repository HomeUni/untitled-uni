import { Client, query } from 'faunadb'

import { FAUNA_SECRET } from './faunaKeys'

const createUserCourse = async (course) => {
    const q = query
    const client = new Client({ secret: FAUNA_SECRET, })
    
    const createUserCourseQuery = client.query(
        q.Get(q.Match(q.Index('user_courses'), course.userId, course.title)
        ))
        .then((ret) => { return 'Course Already Exists' })
        .catch((err) => {
            const createUserCourse = client.query(
                q.Create(q.Collection('userCourses'), { data: course })
            )
            return createUserCourse
        })

    return createUserCourseQuery


}

export default createUserCourse