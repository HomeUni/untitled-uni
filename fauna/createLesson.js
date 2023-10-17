import { Client, query } from 'faunadb'

import { FAUNA_SECRET } from './faunaKeys'

const createLesson = async (lesson) => {
    const q = query

    const client = new Client({ secret: FAUNA_SECRET, })

    const createLessonQuery = client.query(
        q.Get(q.Match(q.Index('get_lesson_by_title'), lesson.title)
        ))
        .then((ret) => { return 'LessonExists' })
        .catch((err) => {
            const createLesson = client.query(
                q.Create(q.Collection('lessons'), { data: lesson })
            )
            return createLesson
        })
    
    return createLessonQuery


}

export default createLesson