package com.grails.blog

class Comment implements Serializable {

    String id = 2
    String name
    String email
    String website
    String content
    Date dateCreated
    String md5Hash

    public String getMd5Hash() {
        return this.email?email.trim().encodeAsMD5() : ''
    }
}
