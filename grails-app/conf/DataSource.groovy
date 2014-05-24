// environment specific settings
environments {
    development {
        grails {
            mongo {
                host = "localhost"
                port = 27017
                databaseName = "gamb-test2"
            }
        }
    }
    test {
        grails {
            mongo {
                host = "localhost"
                port = 27017
                databaseName = "gamb"
            }
        }
    }
    production {
        grails {
            mongo {
                host = "localhost"
                port = 27017
                databaseName = "gamb"
            }
        }
    }
}
