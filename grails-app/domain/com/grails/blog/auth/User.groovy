package com.grails.blog.auth

class User {

	transient springSecurityService

	String username
	String password
    String email
    String name
	boolean enabled = true
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
    String md5HashEmail

    Set<Role> authorities
    static embedded = ['authorities']

	static transients = ['springSecurityService']

	static constraints = {
		username blank: false, unique: true
        password blank: false, size: 6..64
        email blank: false, nullable: false
        name blank: false
	}

	static mapping = {
		password column: '`password`'
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService.encodePassword(password)
	}

    public String getMd5HashEmail() {
        return this.email?.trim().encodeAsMD5()
    }
}
