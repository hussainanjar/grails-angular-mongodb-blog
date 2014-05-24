package com.grails.blog

import static org.springframework.http.HttpStatus.OK

class SettingsController {

    static namespace = 'blogV1'

    static responseFormats = ['json', 'xml']
    static allowedMethods = [update: "PUT"]

    def index() {
        BlogSetting settings = BlogSetting.get(BlogSetting.SETTINGS_ID) ?: new BlogSetting()
        respond settings, [excludes: ['class']]
    }
}
