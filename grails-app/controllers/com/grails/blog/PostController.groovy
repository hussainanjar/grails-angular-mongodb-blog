package com.grails.blog

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class PostController {

    static namespace = 'blogV1'
    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", comments: "POST"]

    def index(Integer max, Integer offset) {
        params.max = Math.min(max ?: 10, 10)
        params.offset = offset?:0

        def postList = Post.collection.find([active:true], [comments: 0]).limit(params.max).skip(params.offset).sort(dateCreated:-1)
        def posts = postList.collect{it as Post}
        respond posts
    }

    def show(String id) {
        def postInstance = Post.collection.findOne(slug: id)
        postInstance = postInstance as Post

        respond postInstance
    }

    @Transactional
    def comments(Comment comment) {
        String postId = params.postId
        Post postInstance = Post.findBySlug(postId)
        if (postInstance == null) {
            notFound()
            return
        }

        if (postInstance.hasErrors()) {
            respond postInstance.errors, view:'create'
            return
        }

        comment.dateCreated = new Date()
        postInstance.commentsCount = (postInstance.commentsCount?:0) + 1
        postInstance.comments.add(comment)
        postInstance.save flush: true
        log.debug("Comment ${postInstance.commentsCount} add for post ${postId}")

        respond comment, [status: CREATED]
    }

    def tags(String tag) {
        def posts = Post.collection.find(tags: tag, active: true).collect { it as Post}
        respond posts
    }

    protected void notFound() {
        render status: NOT_FOUND
    }
}
