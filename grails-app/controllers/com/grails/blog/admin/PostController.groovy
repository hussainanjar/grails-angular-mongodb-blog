package com.grails.blog.admin

import com.grails.blog.Comment
import com.grails.blog.Post
import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.*

@Transactional(readOnly = true)
class PostController {

    def springSecurityService

    static namespace = 'adminV1'
    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", comments: "POST"]

    def index(Integer max, Integer offset) {
        params.max = Math.min(max ?: 40, 50)
        params.offset = offset?:0

        def postList = Post.collection.find([:], [comments: 0]).limit(params.max).skip(params.offset).sort(dateCreated:-1)
        respond postList.collect{it as Post}
    }

    def show(String id) {
        Post postInstance = Post.collection.findOne(_id: id) as Post
        respond postInstance, [excludes: ['class']]
    }

    def create() {
        respond new Post(params)
    }

    @Transactional
    def save(Post postInstance) {
        if (postInstance == null) {
            notFound()
            return
        }

        postInstance.author = springSecurityService.getCurrentUser().username
        postInstance.validate()
        if (postInstance.hasErrors()) {
            respond postInstance.errors, view:'create'
            return
        }

        postInstance.save flush:true

        respond postInstance, [status: CREATED]
    }

    def edit(Post postInstance) {
        respond postInstance
    }

    @Transactional
    def update(Post postInstance) {
        if (postInstance == null) {
            notFound()
            return
        }



        if (postInstance.hasErrors()) {
            respond postInstance.errors, view:'edit'
            return
        }

        postInstance.save flush:true

        respond postInstance, [status: OK]
    }

    @Transactional
    def delete(Post postInstance) {
        if (postInstance == null) {
            notFound()
            return
        }

        postInstance.delete flush:true

        render status: NO_CONTENT
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
