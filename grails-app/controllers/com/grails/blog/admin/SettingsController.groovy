package com.grails.blog.admin

import com.grails.blog.BlogSetting

import static org.springframework.http.HttpStatus.*

class SettingsController {

    static namespace = 'adminV1'

    static responseFormats = ['json', 'xml']
    static allowedMethods = [update: "PUT"]

    def index() {
        BlogSetting settings = BlogSetting.get(BlogSetting.SETTINGS_ID) ?: new BlogSetting()
        respond settings, [excludes: ['class']]
    }

    def update(BlogSetting blogSetting) {
        BlogSetting settings = BlogSetting.get(BlogSetting.SETTINGS_ID) ?: new BlogSetting()
        settings.properties = blogSetting.properties

        settings.validate()
        if (settings.hasErrors()) {
            respond settings.errors
            return
        }

        if (grailsApplication.config.blog.updates.enabled) {
            settings.save()
        }

        respond settings, [status: OK]
    }
}
