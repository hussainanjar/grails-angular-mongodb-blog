package com.grails.blog.admin

import com.grails.blog.auth.User
import com.grails.blog.command.UserPassword

import static org.springframework.http.HttpStatus.*

class UserController {

    static namespace = 'adminV1'
    static responseFormats = ['json', 'xml']

    def springSecurityService

    def profile() {
        def currentUser = springSecurityService.getCurrentUser()
        if (currentUser) {
            respond User.get(currentUser.id), [excludes: ['class','password']]
        } else {
            render status: NOT_FOUND
        }
    }

    def updateProfile(User userInstance) {
        def currentUser = springSecurityService.getCurrentUser()
        if (!currentUser) {
            render status: NOT_FOUND
            return
        }


        userInstance.id = currentUser.id
        userInstance.validate()
        if (userInstance.hasErrors()) {
            respond userInstance.errors
            return
        }

        if (grailsApplication.config.blog.updates.enabled) {
            userInstance.save flush:true
        }

        respond userInstance, [status: OK, excludes: ['class','password']]
    }

    def password(UserPassword password) {
        def currentUserId = springSecurityService.getCurrentUser().id
        User currentUser = User.get(currentUserId)
        if (!currentUser) {
            render status: NOT_FOUND
            return
        }

        if (currentUser.password.equals(springSecurityService.encodePassword(password.currentPassword))) {
            if (password.newPassword.equals(password.confirmPassword)) {
                currentUser.password = password.newPassword
                if (grailsApplication.config.blog.updates.enabled) {
                    currentUser.save()
                }
                render status: OK
            } else {
                password.errors.reject(
                        'userPassword.newPassword.doesnotmatch',
                        '[Property [{0}] of class [{1}] does not match confirmation]')

                password.errors.rejectValue('newPassword','userPassword.newPassword.doesnotmatch',
                        '[Property [{0}] of class [{1}] does not match confirmation]')

                respond password.errors
                return
            }
        } else {
            password.errors.reject(
                    'userPassword.oldPassword.doesnotmatch',
                    '[Property [{0}] of class [{1}] is incorrect]')
        }

        password.validate()
        if (password.hasErrors()) {
            respond password.errors
            return
        }

        if (grailsApplication.config.blog.updates.enabled) {
            currentUser.save flush:true
        }

        respond currentUser, [status: OK]
    }
}
