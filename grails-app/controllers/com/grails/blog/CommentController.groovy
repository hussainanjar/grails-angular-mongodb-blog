package com.grails.blog

import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.*

@Transactional(readOnly = true)
class CommentController {

    static namespace = 'blogV1'
    static responseFormats = ['json', 'xml']
    static allowedMethods = [index: "POST"]

    @Transactional
    def index(String postSlug) {
        Post postInstance = Post.findBySlug(postSlug)
        if (postInstance == null) {
            notFound()
            return
        }

        if (postInstance.hasErrors()) {
            respond postInstance.errors, view:'create'
            return
        }

        Comment comment = new Comment(params)
        comment.dateCreated = new Date()
        postInstance.commentsCount = (post.commentsCount?:0) + 1
        postInstance.comments.add(comment)
        postInstance.save(failOnError: true)
        log.debug("Comment ${post.commentsCount} add for post ${postSlug}")

        respond postInstance, [status: CREATED]
    }

    protected void notFound() {
        render status: NOT_FOUND
    }
}
