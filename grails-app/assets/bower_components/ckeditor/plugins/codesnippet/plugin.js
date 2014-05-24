﻿/*
 Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function(){function f(a){CKEDITOR.tools.extend(this,a);this.queue=[];this.init?this.init(CKEDITOR.tools.bind(function(){for(var a;a=this.queue.pop();)a.call(this);this.ready=!0},this)):this.ready=!0}function l(a){var b=a.config.codeSnippet_codeClass,c=/\r?\n/g;a.widgets.add("codeSnippet",{allowedContent:"pre; code(language-*)",requiredContent:"pre",styleableElements:"pre",template:'<pre><code class="'+b+'"></code></pre>',dialog:"codeSnippet",mask:!0,parts:{pre:"pre",code:"code"},highlight:function(){var d=
this,e=this.data,b=function(a){d.parts.code.setHtml(k?a:a.replace(c,"<br>"))};b(CKEDITOR.tools.htmlEncode(e.code));a._.codesnippet.highlighter.highlight(e.code,e.lang,function(d){a.fire("lockSnapshot");b(d);a.fire("unlockSnapshot")})},data:function(){var a=this.data,b=this.oldData;a.code&&this.parts.code.setHtml(CKEDITOR.tools.htmlEncode(a.code));a.lang&&(this.parts.code.addClass("language-"+a.lang),b&&a.lang!=b.lang&&this.parts.code.removeClass("language-"+b.lang),this.highlight());this.oldData=
CKEDITOR.tools.copy(a)},upcast:function(d,e){if("pre"==d.name){for(var c=[],f=d.children,g,i=f.length-1;0<=i;i--)g=f[i],(g.type!=CKEDITOR.NODE_TEXT||!g.value.match(j))&&c.push(g);var h;if(!(1!=c.length||"code"!=(h=c[0]).name)){if(c=a._.codesnippet.langsRegex.exec(h.attributes["class"]))e.lang=c[1];e.code=h.getHtml();h.addClass(b);return d}}},downcast:function(a){var c=a.getFirst("code");c.children.length=0;c.removeClass(b);c.add(new CKEDITOR.htmlParser.text(CKEDITOR.tools.htmlEncode(this.data.code)));
return a}});var j=/^[\s\n\r]*$/}var k=!CKEDITOR.env.ie||8<CKEDITOR.env.version;CKEDITOR.plugins.add("codesnippet",{requires:"widget,dialog",lang:"bg,ca,cs,da,de,el,en,en-gb,eo,es,et,fa,fr,fr-ca,hr,hu,it,ja,ku,lt,lv,nb,nl,no,pl,pt,ro,ru,sk,sl,sq,sv,th,tt,ug,uk,vi",icons:"codesnippet",hidpi:!0,beforeInit:function(a){a._.codesnippet={};this.setHighlighter=function(b){a._.codesnippet.highlighter=b;b=a._.codesnippet.langs=a.config.codeSnippet_languages||b.languages;a._.codesnippet.langsRegex=RegExp("(?:^|\\s)language-("+
CKEDITOR.tools.objectKeys(b).join("|")+")(?:\\s|$)")}},onLoad:function(){CKEDITOR.dialog.add("codeSnippet",this.path+"dialogs/codesnippet.js")},init:function(a){a.ui.addButton&&a.ui.addButton("CodeSnippet",{label:a.lang.codesnippet.button,command:"codeSnippet",toolbar:"insert,10"})},afterInit:function(a){var b=this.path;l(a);a._.codesnippet.highlighter||this.setHighlighter(new CKEDITOR.plugins.codesnippet.highlighter({languages:{apache:"Apache",bash:"Bash",coffeescript:"CoffeeScript",cpp:"C++",cs:"C#",
css:"CSS",diff:"Diff",html:"HTML",http:"HTTP",ini:"INI",java:"Java",javascript:"JavaScript",json:"JSON",makefile:"Makefile",markdown:"Markdown",nginx:"Nginx",objectivec:"Objective-C",perl:"Perl",php:"PHP",python:"Python",ruby:"Ruby",sql:"SQL",vbscript:"VBScript",xhtml:"XHTML",xml:"XML"},init:function(c){var j=this;k&&CKEDITOR.scriptLoader.load(b+"lib/highlight/highlight.pack.js",function(){j.hljs=window.hljs;c()});a.addContentsCss(b+"lib/highlight/styles/"+a.config.codeSnippet_theme+".css")},highlighter:function(a,
b,d){(a=this.hljs.highlightAuto(a,this.hljs.getLanguage(b)?[b]:void 0))&&d(a.value)}}))}});CKEDITOR.plugins.codesnippet={highlighter:f};f.prototype.highlight=function(){var a=arguments;this.ready?this.highlighter.apply(this,a):this.queue.push(function(){this.highlighter.apply(this,a)})}})();CKEDITOR.config.codeSnippet_codeClass="hljs";CKEDITOR.config.codeSnippet_theme="default";