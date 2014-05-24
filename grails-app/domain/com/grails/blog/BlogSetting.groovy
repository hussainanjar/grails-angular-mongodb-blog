package com.grails.blog

class BlogSetting {
    static final Long SETTINGS_ID = 1
    Long id = SETTINGS_ID
    String blogTitle
    Integer postsPerPage
    String footerContent
    String scripts

    static constraints = {
        id generator: 'assigned'
        scripts nullable: true
    }
}
