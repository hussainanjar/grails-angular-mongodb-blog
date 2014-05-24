<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"><!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Angular Blog</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <asset:link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
    <asset:stylesheet href="bootstrap-css/css/bootstrap.css"/>
    <asset:stylesheet href="blog/main.css"/>
    <asset:javascript src="blog.js"/>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-44345237-2', 'grails-angular-mongodb-blog.herokuapp.com');

    </script>
    <g:layoutHead/>
</head>

<body ng-app="gambApp">
<!--[if lt IE 7]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->


<!-- Add your site or application content here -->
<div id="content" class="container">
    <div ng-include="'blog/views/includes/header.html'"></div>
    <g:layoutBody/>
    <div ng-include="'blog/views/includes/footer.html'"></div>
</div>
</body>
</html>
