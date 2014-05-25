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

        if (grailsApplication.config.blog.updates.enabled) {
            postInstance.save flush:true
        }

        respond postInstance, [status: OK]
    }

    @Transactional
    def delete(Post postInstance) {
        if (postInstance == null) {
            notFound()
            return
        }

        if (grailsApplication.config.blog.updates.enabled) {
            postInstance.delete flush:true
        }

        render status: NO_CONTENT
    }

    protected void notFound() {
        render status: NOT_FOUND
    }
}
