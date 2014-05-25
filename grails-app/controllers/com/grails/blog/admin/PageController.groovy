package com.grails.blog.admin

import com.grails.blog.Page
import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.*

class PageController {

    static namespace = 'adminV1'
    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        def pageList = Page.collection.find().sort(dateCreated:-1)
        respond pageList.collect{it as Page}
    }

    def show(String id) {
        Page pageInstance = Page.collection.findOne(_id: id) as Page
        respond pageInstance, [excludes: ['class']]
    }

    @Transactional
    def save(Page pageInstance) {
        if (pageInstance == null) {
            notFound()
            return
        }

        if (pageInstance.hasErrors()) {
            respond pageInstance.errors, view:'create'
            return
        }

        pageInstance.save flush:true

        respond pageInstance, [status: CREATED]
    }

    @Transactional
    def update(Page pageInstance) {
        if (pageInstance == null) {
            notFound()
            return
        }

        if (pageInstance.hasErrors()) {
            respond pageInstance.errors, view:'edit'
            return
        }

        if (grailsApplication.config.blog.updates.enabled) {
            pageInstance.save flush:true
        }

        respond pageInstance, [status: OK]
    }

    @Transactional
    def delete(Page pageInstance) {

        if (pageInstance == null) {
            notFound()
            return
        }

        if (grailsApplication.config.blog.updates.enabled) {
            pageInstance.delete flush:true
        }

        render status: NO_CONTENT
    }

    protected void notFound() {
        render status: NOT_FOUND
    }
}
