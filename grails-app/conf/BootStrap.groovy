import com.grails.blog.BlogSetting
import com.grails.blog.auth.Role
import com.grails.blog.auth.User

class BootStrap {

    def init = { servletContext ->

        Role roleAdmin = Role.findByAuthority("ROLE_ADMIN") ?:
            new Role(authority: "ROLE_ADMIN").save(failOnError: true)


         User.findByUsername("admin") ?:
            new User(username: 'admin',
                password: 'admin123',
                email: 'hussain.engr@gmail.com',
                name: 'Hussain Fakhruddin',
                authorities: [roleAdmin]).save(failOnError: true)

        BlogSetting.get(BlogSetting.SETTINGS_ID) ?:
            new BlogSetting(blogTitle: "Grails Angular MongoDB Blog",
                    postsPerPage: 5,
                    footerContent: "Blog powered by <a href=\"http://grails.org\">Grails</a>, <a href=\"http://angularjs.org\">AngularJS</a> &amp; <a href=\"http://mongodb.org\">MongoDB</a>").save()
    }
    def destroy = {
    }
}
