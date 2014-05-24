package com.grails.blog

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class PageController {

    static namespace = 'blogV1'
    static responseFormats = ['json', 'xml']

    def show(String  id) {
        Page pageInstance = Page.findBySlugAndActive(id, true)
        if (pageInstance == null) {
            notFound()
            return
        }
        respond pageInstance
    }


    def menu() {
        def pageList = Page.findAllByActiveAndIncludeInMenu(true, true)
        respond pageList
    }

    protected void notFound() {
        render status: NOT_FOUND
    }
}
