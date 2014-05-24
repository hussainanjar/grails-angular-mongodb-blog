package com.grails.blog

class Post {

    String id
    String title
    String slug
    String content
    List<String> tags
    Date dateCreated
    Date lastUpdated
    String author
    Integer commentsCount = 0
    Boolean active=false
    // embedded documents
    List<Comment> comments

    static embedded = ['comments']
    static hasMany = [comments: Comment, tags: String]

    static constraints = {
        commentsCount nullable: true
    }

    static mapping = {
        slug index: true, indexAttributes: [unique:true, dropDups:true]
    }
}
