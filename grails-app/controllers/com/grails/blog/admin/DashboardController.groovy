package com.grails.blog.admin

import com.grails.blog.Page
import com.grails.blog.Post
import com.grails.blog.command.Dashboard

class DashboardController {

    static namespace = 'adminV1'
    static responseFormats = ['json', 'xml']

    def index() {
        Dashboard dashboard = new Dashboard()
        dashboard.activePages = Page.countByActive(true)
        dashboard.inActivePages = Page.countByActive(false)
        dashboard.activePosts = Post.countByActive(true)
        dashboard.inActivePosts = Post.countByActive(false)

        respond dashboard
    }
}
