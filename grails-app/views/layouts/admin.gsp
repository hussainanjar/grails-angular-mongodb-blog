<!DOCTYPE html>
<html ng-app="gambApp" lang="en">
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><g:layoutTitle default="GAMB Admin"/></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <asset:link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon"/>
    <asset:stylesheet href="font-awesome/css/font-awesome.css" />
    <asset:stylesheet href="bootstrap-css/css/bootstrap.css" />
    <asset:stylesheet href="admin/main.css" />
    <asset:javascript src="ckeditor/ckeditor.js"/>
    <asset:javascript src="admin.js"/>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-44345237-2', 'grails-angular-mongodb-blog.herokuapp.com');

    </script>
    <g:layoutHead/>
</head>
<body>
<div id="wrap">
    <div ng-include="'views/includes/header.html'"></div>
    <div class="container" id="content">
        <g:layoutBody/>
    </div>
</div>
<div ng-include="'views/includes/footer.html'"></div>
<a href="https://github.com/hussainanjar/grails-angular-mongodb-blog"><img style="position: absolute; top: 0; left: 0; border: 0;" src="http://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png" alt="Fork me on GitHub"></a>
</body>
</html>