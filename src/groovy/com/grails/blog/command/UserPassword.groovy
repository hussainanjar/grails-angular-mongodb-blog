package com.grails.blog.command

import grails.validation.Validateable

/**
 * Created with IntelliJ IDEA.
 * User: hussain
 * Date: 5/10/14
 * Time: 3:31 PM
 * To change this template use File | Settings | File Templates.
 */
@Validateable
class UserPassword {

    String currentPassword
    String newPassword
    String confirmPassword
}
