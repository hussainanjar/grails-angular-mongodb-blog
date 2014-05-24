class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/v1/posts"(resources: 'post', namespace:'blogV1')
        "/v1/posts"(resources: 'post', namespace:'blogV1') {
            "/comments"(controller:"post", action:"comments", method:"POST", namespace: 'blogV1')
        }
        "/v1/posts/tags/$tag"(controller: 'post', action: "tags", method:"GET", namespace:'blogV1')
        "/v1/pages"(resources: 'page', namespace:'blogV1')
        "/v1/pages/menu"(controller: 'page', action: 'menu', namespace: 'blogV1')
        "/v1/settings/$action?"(controller: 'settings', namespace: 'blogV1')




        "/admin/v1/pages"(resources: 'page', namespace: 'adminV1')
        "/admin/v1/posts"(resources: 'post', namespace: 'adminV1')
        "/admin/v1/dashboard"(controller: 'dashboard', namespace: 'adminV1')
        "/admin/v1/users/$action?"(controller: 'user', namespace: 'adminV1')
        "/admin/v1/settings/$action?"(controller: 'settings', namespace: 'adminV1')




        "/"(view:"/blog/index")
        "/admin"(view:"/admin/index")
        "500"(view:'/error')
	}
}
