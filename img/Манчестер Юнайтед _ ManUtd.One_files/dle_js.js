var c_cache=[],dle_poll_voted=[];function reload(){var e=(new Date).getTime();document.getElementById("dle-captcha").innerHTML='<img src="'+dle_root+"engine/modules/antibot/antibot.php?rndval="+e+'" width="160" height="80" alt="" />'}function dle_change_sort(e,o){var t=document.getElementById("news_set_sort");return t.dlenewssortby.value=e,t.dledirection.value=o,t.submit(),!1}function doPoll(e,o){var t=document.getElementById("dlepollform_"+o),i=t.status.value,n="";if(1!=dle_poll_voted[o]){if("results"!=e&&1!=i){for(var d=0;d<t.elements.length;d++){var l=t.elements[d];if("radio"==l.type&&1==l.checked){n=l.value;break}"checkbox"==l.type&&1==l.checked&&(n=n+l.value+" ")}if("vote"==e&&""==n)return;dle_poll_voted[o]=1}else i=1,t.status.value=1;1==i&&"vote"==e&&(i=0,t.status.value=0,e="list"),ShowLoading(""),$.post(dle_root+"engine/ajax/controller.php?mod=poll",{news_id:o,action:e,answer:n,dle_skin:dle_skin,user_hash:dle_login_hash},function(e){HideLoading(""),$("#dle-poll-list-"+o).fadeOut(500,function(){$(this).html(e),$(this).fadeIn(500)})})}}function IPMenu(e,o,t,i){var n=[];return n[0]='<a href="https://www.nic.ru/whois/?searchWord='+e+'" target="_blank">'+o+"</a>",n[1]='<a href="'+dle_root+dle_admin+"?mod=iptools&ip="+e+'" target="_blank">'+t+"</a>",n[2]='<a href="'+dle_root+dle_admin+"?mod=blockip&ip="+e+'" target="_blank">'+i+"</a>",n}function ajax_save_for_edit(e,o){var t={};return"2"==quick_wysiwyg&&tinyMCE.triggerSave(),$.each($("#ajaxnews"+e).serializeArray(),function(e,o){t[o.name]=o.value}),t.id=e,t.field=o,t.action="save",t.user_hash=dle_login_hash,ShowLoading(""),$.post(dle_root+"engine/ajax/controller.php?mod=editnews",t,function(e){HideLoading(""),"ok"!=e?DLEalert(e,dle_info):($("#dlepopup-news-edit").dialog("close"),DLEconfirm(dle_save_ok,dle_confirm,function(){location.reload(!0)}))}),!1}function ajax_prep_for_edit(d,l){for(var e=0,o=c_cache.length;e<o;e++)e in c_cache&&(!c_cache[e]&&""==c_cache[e]||ajax_cancel_comm_edit(e));return ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=editnews",{id:d,field:l,action:"edit"},function(e){HideLoading("");var t="none";$("#modal-overlay").remove(),$("body").prepend('<div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #666666; opacity: .40;filter:Alpha(Opacity=40); z-index: 999; display:none;"></div>'),$("#modal-overlay").css({filter:"alpha(opacity=40)"}).fadeIn();var o={};o[dle_act_lang[3]]=function(){$(this).dialog("close")},o[dle_act_lang[4]]=function(){ajax_save_for_edit(d,l)},$("#dlepopup-news-edit").remove(),$("body").prepend("<div id='dlepopup-news-edit' class='dlepopupnewsedit' title='"+menu_short+"' style='display:none'></div>"),$(".dlepopupnewsedit").html("");var i=.9*$(window).height(),n=.9*$(window).width();1024<n&&(n=1024),$("#dlepopup-news-edit").dialog({autoOpen:!0,width:n,height:i,buttons:o,resizable:!1,dialogClass:"modalfixed dle-popup-quickedit",dragStart:function(e,o){t=$(".modalfixed").css("box-shadow"),$(".modalfixed").css("box-shadow","none")},dragStop:function(e,o){$(".modalfixed").css("box-shadow",t)},close:function(e,o){$(this).dialog("destroy"),$("#modal-overlay").fadeOut(function(){$("#modal-overlay").remove()})}}),830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup-news-edit").dialog("option","position",{my:"center",at:"center",of:window})),$("#dlepopup-news-edit").css({overflow:"auto"}),$("#dlepopup-news-edit").css({"overflow-x":"hidden"}),$("#dlepopup-news-edit").html(e)},"html"),!1}function ajax_comm_edit(o,e){for(var t=0,i=c_cache.length;t<i;t++)t in c_cache&&""!=c_cache[t]&&ajax_cancel_comm_edit(t);return c_cache[o]&&""!=c_cache[o]||(c_cache[o]=$("#comm-id-"+o).html()),ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=editcomments",{id:o,area:e,action:"edit"},function(e){HideLoading(""),$("#comm-id-"+o).html(e),setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#comm-id-"+o).offset().top-100},700)},100)},"html"),!1}function ajax_cancel_comm_edit(e){return""!=c_cache[e]&&$("#comm-id-"+e).html(c_cache[e]),c_cache[e]="",!1}function ajax_save_comm_edit(o,e){"2"==dle_wysiwyg&&tinyMCE.triggerSave();var t=$("#dleeditcomments"+o).val();return ShowLoading(""),$.post(dle_root+"engine/ajax/controller.php?mod=editcomments",{id:o,comm_txt:t,area:e,action:"save",user_hash:dle_login_hash},function(e){HideLoading(""),c_cache[o]="",$("#comm-id-"+o).html(e)}),!1}function DeleteComments(e,o){DLEconfirm(dle_del_agree,dle_confirm,function(){ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=deletecomments",{id:e,dle_allow_hash:o},function(e){var o;HideLoading(""),e=parseInt(e),isNaN(e)||(o=null,o="1"==dle_tree_comm?$("#comments-tree-item-"+e):$("#comment-id-"+e),$("html,body").stop().animate({scrollTop:o.offset().top-70},700),setTimeout(function(){o.hide("blind",{},1400)},700))})})}function MarkSpam(e,o){DLEconfirm(dle_spam_agree,dle_confirm,function(){ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=adminfunction",{id:e,action:"commentsspam",user_hash:o},function(e){HideLoading(""),"error"!=e&&DLEconfirm(e,dle_confirm,function(){location.reload(!0)})})})}function doFavorites(o,e,t){return ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=favorites",{fav_id:o,action:e,skin:dle_skin,alert:t,user_hash:dle_login_hash},function(e){HideLoading(""),t?DLEalert(e,dle_info):$("#fav-id-"+o).html(e)}),!1}function CheckLogin(){var e=document.getElementById("name").value;return ShowLoading(""),$.post(dle_root+"engine/ajax/controller.php?mod=registration",{name:e,user_hash:dle_login_hash},function(e){HideLoading(""),$("#result-registration").html(e)}),!1}function doCalendar(e,o,t){ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=calendar",{month:e,year:o},function(e){HideLoading(""),"left"==t?$("#calendar-layer").hide("slide",{direction:"left"},500,function(){$("#calendar-layer").html(e).show("slide",{direction:"right"},500)}):$("#calendar-layer").hide("slide",{direction:"right"},500,function(){$("#calendar-layer").html(e).show("slide",{direction:"left"},500)})})}function doRate(e,t){ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=rating",{go_rate:e,news_id:t,skin:dle_skin,user_hash:dle_login_hash},function(e){var o;HideLoading(""),e.success?(o=(o=(o=(o=e.rating).replace(/&lt;/g,"<")).replace(/&gt;/g,">")).replace(/&amp;/g,"&"),$("#ratig-layer-"+t).html(o),$("#vote-num-id-"+t).html(e.votenum),$("#likes-id-"+t).html(e.likes),$("#dislikes-id-"+t).html(e.dislikes)):e.error&&DLEalert(e.errorinfo,dle_info)},"json")}function doCommentsRate(e,t){ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=ratingcomments",{go_rate:e,c_id:t,skin:dle_skin,user_hash:dle_login_hash},function(e){var o;HideLoading(""),e.success?(o=(o=(o=(o=e.rating).replace(/&lt;/g,"<")).replace(/&gt;/g,">")).replace(/&amp;/g,"&"),$("#comments-ratig-layer-"+t).html(o),$("#comments-vote-num-id-"+t).html(e.votenum),$("#comments-likes-id-"+t).html(e.likes),$("#comments-dislikes-id-"+t).html(e.dislikes)):e.error&&DLEalert(e.errorinfo,dle_info)},"json")}function ajax_cancel_reply(){$("#dlefastreplycomments").hide("blind",{},1400)}function DLESendPM(e){var o={};return $("#dlesendpmpopup").remove(),$("#dleprofilepopup").remove(),o[dle_act_lang[3]]=function(){$(this).dialog("close")},o[dle_p_send]=function(){"2"==dle_wysiwyg&&tinyMCE.triggerSave();var e=$("#pm_subj").val(),o=$("#pm_text").val(),t=$("#pm_name").val(),i=$("#pm_question_answer").val(),n=$("#sec_code_pm").val(),d=$("#outboxcopy:checked").val(),l="";return""==t?DLEalert(dle_req_field[0],dle_info):""==o?DLEalert(dle_req_field[1],dle_info):""==e?DLEalert(dle_req_field[2],dle_info):("1"==dle_captcha_type?"undefined"!=typeof grecaptcha&&(l=grecaptcha.getResponse(recaptcha_widget)):"2"==dle_captcha_type&&(l=$("#pm-recaptcha-response").val()),d=d||0,n=n||"",i=i||"",ShowLoading(""),$.post(dle_root+"engine/ajax/controller.php?mod=pm",{action:"send_pm",subj:e,comments:o,name:t,skin:dle_skin,sec_code:n,question_answer:i,g_recaptcha_response:l,outboxcopy:d,user_hash:dle_login_hash},function(e){var o;HideLoading(""),e.success?($("#dlesendpmpopup").remove(),DLEalert(e.success,dle_info)):e.error&&("2"==dle_captcha_type&&"undefined"!=typeof grecaptcha&&(o=$("#pm-recaptcha-response").data("key"),grecaptcha.execute(o,{action:"pm"}).then(function(e){$("#pm-recaptcha-response").val(e)})),DLEalert(e.error,dle_info))},"json")),!1},ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=pm",{name:e,action:"show_send",skin:dle_skin,user_hash:dle_login_hash},function(e){HideLoading(""),$("body").append(e),$("#dlesendpmpopup").dialog({autoOpen:!0,width:800,resizable:!1,dialogClass:"modalfixed dle-popup-sendpm",buttons:o}),$(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlesendpmpopup").dialog("option","position",{my:"center",at:"center",of:window})},"html"),!1}function ajax_fast_reply(e,o,t){var i="";"1"!=dle_wysiwyg&&"2"!=dle_wysiwyg||("2"==dle_wysiwyg&&tinyMCE.triggerSave(),i="wysiwyg");var n=$("#comments"+e).val(),d=$("#name"+e).val(),l=$("#question_answer"+e).val(),a=$("#sec_code"+e).val(),s=$("#subscribe"+e+":checked").val(),r=$("#postid"+e).val(),c="";return""==d?DLEalert(dle_req_field[0],dle_info):""==n?DLEalert(dle_req_field[1],dle_info):("1"==dle_captcha_type?"undefined"!=typeof grecaptcha&&(c=grecaptcha.getResponse(recaptcha_widget)):"2"==dle_captcha_type&&(c=$("#comments-recaptcha-response"+e).val()),s=s||0,a=a||"",l=l||"",ShowLoading(""),$.post(dle_root+"engine/ajax/controller.php?mod=addcomments",{post_id:r,parent:e,indent:o,comments:n,name:d,mail:"",editor_mode:i,skin:dle_skin,sec_code:a,question_answer:l,g_recaptcha_response:c,allow_subscribe:s,user_hash:dle_login_hash,needwrap:t},function(e){var o;HideLoading(""),e.error?$(e.content).insertBefore("#dlefastreplyesponse"):e.success&&($("#comm-id-"+e.id).length?(o=$(e.content).find("#comm-id-"+e.id).html(),$("#dlefastreplycomments").hide(),$("html,body").stop().animate({scrollTop:$("#comm-id-"+e.id).offset().top-100},600,function(){$("#comm-id-"+e.id).fadeOut("slow",function(){$(this).html(o+"<script>"+e.scripts+"<\/script>"),$("#comm-id-"+e.id).fadeIn("slow")})})):($(e.content+"<script>"+e.scripts+"<\/script>").insertBefore("#dlefastreplyesponse"),$("#dlefastreplycomments").hide("blind",{},500),setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#dlefastreplyesponse").offset().top-100},600,function(){$("#comments-tree-item-"+e.id).show("blind",{},700)})},600)))},"json")),!1}function dle_reply(s,r,o){var t={},c="",p=0;return $("#dlereplypopup").remove(),$("#dlefastreplyesponse").remove(),$("#dlefastreplycomments").remove(),$("#comment-id-"+s).next(".comments-tree-list").length?$("#comment-id-"+s).next(".comments-tree-list").append("<div id='dlefastreplyesponse'></div>"):($("<div id='dlefastreplyesponse'></div>").insertAfter("#comment-id-"+s),p=1),t[dle_act_lang[3]]=function(){$(this).dialog("close")},t[dle_p_send]=function(){"1"!=dle_wysiwyg&&"2"!=dle_wysiwyg||("2"==dle_wysiwyg&&tinyMCE.triggerSave(),c="wysiwyg");var e=$("#comments"+s).val(),o=$("#name"+s).val(),t=$("#mail"+s).val(),i=$("#question_answer"+s).val(),n=$("#sec_code"+s).val(),d=$("#subscribe"+s+":checked").val(),l=$("#postid"+s).val(),a="";return""==o?DLEalert(dle_req_field[0],dle_info):""==e?DLEalert(dle_req_field[1],dle_info):("1"==dle_captcha_type?"undefined"!=typeof grecaptcha&&(a=grecaptcha.getResponse(recaptcha_widget)):"2"==dle_captcha_type&&(a=$("#comments-recaptcha-response"+s).val()),d=d||0,n=n||"",i=i||"",ShowLoading(""),$.post(dle_root+"engine/ajax/controller.php?mod=addcomments",{post_id:l,parent:s,indent:r,comments:e,name:o,mail:t,editor_mode:c,skin:dle_skin,sec_code:n,question_answer:i,g_recaptcha_response:a,allow_subscribe:d,user_hash:dle_login_hash,needwrap:p},function(e){var o;HideLoading(""),e.error?$(e.content).insertBefore("#dlefastreplyesponse"):e.success&&($("#dlereplypopup").remove(),$("#comm-id-"+e.id).length?(o=$(e.content).find("#comm-id-"+e.id).html(),$("#dlefastreplycomments").hide(),$("html,body").stop().animate({scrollTop:$("#comm-id-"+e.id).offset().top-100},600,function(){$("#comm-id-"+e.id).fadeOut("slow",function(){$(this).html(o+"<script>"+e.scripts+"<\/script>"),$("#comm-id-"+e.id).fadeIn("slow")})})):($(e.content+"<script>"+e.scripts+"<\/script>").insertBefore("#dlefastreplyesponse"),$("#dlefastreplycomments").hide("blind",{},500),setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#dlefastreplyesponse").offset().top-100},600,function(){$("#comments-tree-item-"+e.id).show("blind",{},700)})},600)))},"json")),!1},ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=replycomments",{id:s,indent:r,skin:dle_skin,user_hash:dle_login_hash,needwrap:p},function(e){HideLoading(""),"0"!=o?($("<div id='dlefastreplycomments' style='display:none'></div>").insertAfter("#comment-id-"+s),$("#dlefastreplycomments").html(e),$("html,body").stop().animate({scrollTop:$("#comment-id-"+s).offset().top+$("#comment-id-"+s).height()-100},600),setTimeout(function(){$("#dlefastreplycomments").show("blind",{},700)},600)):($("body").append("<div id='dlereplypopup' title='"+dle_reply_title+"' style='display:none'></div>"),$("#dlereplypopup").html(e),$("#dlereplypopup").dialog({autoOpen:!0,width:800,resizable:!1,dialogClass:"modalfixed dle-popup-replycomments",buttons:t}),$(".modalfixed.ui-dialog").css({position:"fixed"}),$(".dle-popup-replycomments").css({cssText:"width:800px; max-height: none !important"}),$("#dlereplypopup").css({cssText:"height: auto !important"}),$("#dlereplypopup").dialog("option","position",{my:"center",at:"center",of:window}))},"html"),!1}function doAddComments(){var i=document.getElementById("dle-comments-form"),e="",o="",t="",n="",d="0",l="";return"1"!=dle_wysiwyg&&"2"!=dle_wysiwyg||("2"==dle_wysiwyg&&tinyMCE.triggerSave(),e="wysiwyg"),""==i.name.value?DLEalert(dle_req_field[0],dle_info):""==i.comments.value?DLEalert(dle_req_field[1],dle_info):(i.question_answer&&(o=i.question_answer.value),i.sec_code&&(t=i.sec_code.value),"1"==dle_captcha_type?"undefined"!=typeof grecaptcha&&(n=grecaptcha.getResponse()):"2"==dle_captcha_type&&(n=$("#g-recaptcha-response").val()),i.allow_subscribe&&1==i.allow_subscribe.checked&&(d="1"),i.mail&&(l=i.mail.value),ShowLoading(""),$.post(dle_root+"engine/ajax/controller.php?mod=addcomments",{post_id:i.post_id.value,comments:i.comments.value,name:i.name.value,mail:l,editor_mode:e,skin:dle_skin,sec_code:t,question_answer:o,g_recaptcha_response:n,allow_subscribe:d,user_hash:dle_login_hash},function(e){var o,t;HideLoading(""),e.error?$("#dle-ajax-comments").append(e.content):e.success&&($("#comm-id-"+e.id).length?(o=$(e.content).find("#comm-id-"+e.id).html(),$("html,body").stop().animate({scrollTop:$("#comm-id-"+e.id).offset().top-100},600,function(){$("#comm-id-"+e.id).fadeOut("slow",function(){$(this).html(o+"<script>"+e.scripts+"<\/script>"),$("#comm-id-"+e.id).fadeIn("slow")})})):($(e.content+"<script>"+e.scripts+"<\/script>").insertBefore("#dle-ajax-comments"),node=$("#comments-tree-item-"+e.id).length?$("#comments-tree-item-"+e.id):$("#blind-animation-"+e.id),$("html,body").stop().animate({scrollTop:$("#dle-ajax-comments").offset().top-100},600,function(){$(node).show("blind",{},700)})),i.sec_code&&(i.sec_code.value="",reload()),"1"==dle_captcha_type?"undefined"!=typeof grecaptcha&&grecaptcha.reset():"2"==dle_captcha_type&&"undefined"!=typeof grecaptcha&&(t=$("#g-recaptcha-response").data("key"),grecaptcha.execute(t,{action:"comments"}).then(function(e){$("#g-recaptcha-response").val(e)})))},"json")),!1}function isHistoryApiAvailable(){return!(!window.history||!history.pushState)}function CommentsPage(o,t,i){return ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=comments",{cstart:o,news_id:t,skin:dle_skin},function(e){HideLoading(""),isNaN(o)||isNaN(t)||($("#dle-comm-link").off("click"),$("#dle-comm-link").on("click",function(){return CommentsPage(o,t),!1})),scroll(0,$("#dle-comments-list").offset().top-100),$("#dle-comments-list").html(e.comments),$(".dle-comments-navigation").html(e.navigation),isHistoryApiAvailable()&&window.history.pushState(null,null,i)},"json"),!1}function dle_copy_quote(e){dle_txt="",window.getSelection?dle_txt=window.getSelection().toString():document.selection&&(dle_txt=document.selection.createRange().text.toString()),""!=dle_txt&&(dle_txt="0"==dle_wysiwyg||"-1"==dle_wysiwyg?"[quote="+e+"]"+dle_txt+"[/quote]":(dle_txt=dle_txt.replace(/\n/g,"<br>"),dle_txt=dle_txt.replace(/\r/g,""),"1"==dle_wysiwyg?'<div class="quote_block noncontenteditable"><div class="title_quote">'+dle_quote_title+" "+e+'</div><div class="quote"><div class="quote_body contenteditable">'+dle_txt+"</div></div></div><br>":'<div class="quote_block noncontenteditable"><div class="title_quote">'+dle_quote_title+" "+e+'</div><div class="quote"><div class="quote_body contenteditable">'+dle_txt+"</div></div></div><p><br></p>"))}function dle_fastreply(e){if(!document.getElementById("dle-comments-form"))return!1;var o,t=document.getElementById("dle-comments-form").comments,i="";return"0"==dle_wysiwyg||"-1"==dle_wysiwyg?("0"==dle_wysiwyg?t.value+="[b]"+e+"[/b],\n":t.value+=e+",\n",setTimeout(function(){t.focus()},800),i=".bb-editor"):(o="<div><b>"+e+"</b>,</div><br>",i=".wseditor","1"==dle_wysiwyg?($("#comments").froalaEditor("events.focus"),$("#comments").froalaEditor("html.insert",o,!0)):tinyMCE.execCommand("mceInsertContent",!1,o)),setTimeout(function(){$("html,body").stop().animate({scrollTop:$(i).offset().top-100},700)},100),!1}function dle_ins(e){if(!document.getElementById("dle-comments-form"))return!1;var o=document.getElementById("dle-comments-form").comments,t="",i="";return""!=dle_txt?("0"==dle_wysiwyg||"-1"==dle_wysiwyg?(o.value+=dle_txt+"\n",setTimeout(function(){o.focus()},800),i=".bb-editor"):(t=dle_txt,i=".wseditor","1"==dle_wysiwyg?($("#comments").froalaEditor("events.focus"),$("#comments").froalaEditor("html.insert",t,!0)):tinyMCE.execCommand("mceInsertContent",!1,t)),setTimeout(function(){$("html,body").stop().animate({scrollTop:$(i).offset().top-100},700)},100)):(ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=quote",{id:e,user_hash:dle_login_hash},function(e){HideLoading(""),e=(e=(e=(e=(e=(e=(e=e.replace(/&lt;/g,"<")).replace(/&gt;/g,">")).replace(/&amp;/g,"&")).replace(/&quot;/g,'"')).replace(/&#039;/g,"'")).replace(/&#039;/g,"'")).replace(/&#34;/g,'"'),"0"==dle_wysiwyg||"-1"==dle_wysiwyg?(o.value+=e+"\n",setTimeout(function(){o.focus()},800),i=".bb-editor"):(t=e,i=".wseditor","1"==dle_wysiwyg?($("#comments").froalaEditor("events.focus"),$("#comments").froalaEditor("html.insert",t+"<br>",!0)):tinyMCE.execCommand("mceInsertContent",!1,t+"<p><br></p>")),setTimeout(function(){$("html,body").stop().animate({scrollTop:$(i).offset().top-100},700)},100)})),!1}function ShowOrHide(e){var o=$("#"+e),t=null;document.getElementById("image-"+e)&&(t=document.getElementById("image-"+e));e=o.height()/200*1e3;3e3<e&&(e=3e3),e<250&&(e=250),"none"==o.css("display")?(o.show("blind",{},e),t&&(t.src=dle_root+"templates/"+dle_skin+"/dleimages/spoiler-minus.gif")):(2e3<e&&(e=2e3),o.hide("blind",{},e),t&&(t.src=dle_root+"templates/"+dle_skin+"/dleimages/spoiler-plus.gif"))}function ckeck_uncheck_all(){for(var e=document.pmlist,o=0;o<e.elements.length;o++){var t=e.elements[o];"checkbox"==t.type&&(1==e.master_box.checked?t.checked=!1:t.checked=!0)}1==e.master_box.checked?e.master_box.checked=!1:e.master_box.checked=!0}function confirmDelete(e){DLEconfirm(dle_del_agree,dle_confirm,function(){document.location=e})}function setNewField(e,o){e!=selField&&(fombj=o,selField=e)}function dle_news_delete(o){var e={};e[dle_act_lang[1]]=function(){$(this).dialog("close")},allow_dle_delete_news&&(e[dle_del_msg]=function(){$(this).dialog("close");var e={};e[dle_act_lang[3]]=function(){$(this).dialog("close")},e[dle_p_send]=function(){var e;$("#dle-promt-text").val().length<1?$("#dle-promt-text").addClass("ui-state-error"):(e=$("#dle-promt-text").val(),$(this).dialog("close"),$("#dlepopup").remove(),$.post(dle_root+"engine/ajax/controller.php?mod=message",{id:o,user_hash:dle_login_hash,text:e},function(e){"ok"==e?document.location=dle_root+"index.php?do=deletenews&id="+o+"&hash="+dle_login_hash:DLEalert("Send Error",dle_info)}))},$("#dlepopup").remove(),$("body").append("<div id='dlepopup' class='dle-promt' title='"+dle_notice+"' style='display:none'>"+dle_p_text+"<br /><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px;'></textarea></div>"),$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-newsdelete",buttons:e}),$(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup").dialog("option","position",{my:"center",at:"center",of:window})}),e[dle_act_lang[0]]=function(){$(this).dialog("close"),document.location=dle_root+"index.php?do=deletenews&id="+o+"&hash="+dle_login_hash},$("#dlepopup").remove(),$("body").append("<div id='dlepopup' class='dle-promt' title='"+dle_confirm+"' style='display:none'><div id='dlepopupmessage'>"+dle_del_agree+"</div></div>"),$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-newsdelete",buttons:e}),$(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup").dialog("option","position",{my:"center",at:"center",of:window})}function MenuNewsBuild(e,o){var t=[];return t[0]="<a onclick=\"ajax_prep_for_edit('"+e+"', '"+o+'\'); return false;" href="#">'+menu_short+"</a>",""!=dle_admin&&(t[1]='<a href="'+dle_root+dle_admin+"?mod=editnews&action=editnews&id="+e+'" target="_blank">'+menu_full+"</a>"),allow_dle_delete_news&&(t[2]="<a onclick=\"sendNotice ('"+e+'\'); return false;" href="#">'+dle_notice+"</a>",t[3]="<a onclick=\"dle_news_delete ('"+e+'\'); return false;" href="#">'+dle_del_news+"</a>"),t}function sendNotice(o){var e={};e[dle_act_lang[3]]=function(){$(this).dialog("close")},e[dle_p_send]=function(){var e;$("#dle-promt-text").val().length<1?$("#dle-promt-text").addClass("ui-state-error"):(e=$("#dle-promt-text").val(),$(this).dialog("close"),$("#dlepopup").remove(),$.post(dle_root+"engine/ajax/controller.php?mod=message",{id:o,user_hash:dle_login_hash,text:e,allowdelete:"no"},function(e){"ok"==e&&DLEalert(dle_p_send_ok,dle_info)}))},$("#dlepopup").remove(),$("body").append("<div id='dlepopup' title='"+dle_notice+"' style='display:none'>"+dle_p_text+"<br /><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px;'></textarea></div>"),$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-sendmessage",buttons:e}),$(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup").dialog("option","position",{my:"center",at:"center",of:window})}function AddComplaint(t,i){var e={},o="";e[dle_act_lang[3]]=function(){$(this).dialog("close")},e[dle_p_send]=function(){var e,o;$("#dle-promt-text").val().length<1?$("#dle-promt-text").addClass("ui-state-error"):(e=$("#dle-promt-text").val(),o="",$("#dle-promt-mail").val()&&(o=$("#dle-promt-mail").val()),$(this).dialog("close"),$("#dlepopup").remove(),$.post(dle_root+"engine/ajax/controller.php?mod=complaint",{id:t,text:e,action:i,mail:o,user_hash:dle_login_hash},function(e){DLEalert("ok"==e?dle_p_send_ok:e,dle_info)}))},$("#dlepopup").remove(),5==dle_group&&(o=dle_mail+'<br><input type="text" name="dle-promt-mail" id="dle-promt-mail" class="ui-widget-content ui-corner-all" style="width:100%;" value="">'),$("body").append("<div id='dlepopup' title='"+dle_c_title+"' style='display:none'>"+dle_complaint+"<br><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:100%;height:100px;'></textarea>"+o+"</div>"),$("#dlepopup").dialog({autoOpen:!0,width:600,resizable:!1,dialogClass:"modalfixed dle-popup-complaint",buttons:e}),$(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup").dialog("option","position",{my:"center",at:"center",of:window})}function DLEalert(e,o){$("#dlepopup").remove(),$("body").append("<div id='dlepopup' class='dle-alert' title='"+o+"' style='display:none'>"+e+"</div>"),$("#dlepopup").dialog({autoOpen:!0,width:470,resizable:!1,dialogClass:"modalfixed dle-popup-alert",buttons:{Ok:function(){$(this).dialog("close"),$("#dlepopup").remove()}}}),$(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup").dialog("option","position",{my:"center",at:"center",of:window})}function DLEconfirm(e,o,t){var i={};i[dle_act_lang[1]]=function(){$(this).dialog("close"),$("#dlepopup").remove()},i[dle_act_lang[0]]=function(){$(this).dialog("close"),$("#dlepopup").remove(),t&&t()},$("#dlepopup").remove(),$("body").append("<div id='dlepopup' class='dle-confirm' title='"+o+"' style='display:none'>"+e+"</div>"),$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-confirm",buttons:i}),$(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup").dialog("option","position",{my:"center",at:"center",of:window})}function DLEprompt(e,o,t,i,n){var d={};d[dle_act_lang[3]]=function(){$(this).dialog("close")},d[dle_act_lang[2]]=function(){var e;!n&&$("#dle-promt-text").val().length<1?$("#dle-promt-text").addClass("ui-state-error"):(e=$("#dle-promt-text").val(),$(this).dialog("close"),$("#dlepopup").remove(),i&&i(e))},$("#dlepopup").remove(),$("body").append("<div id='dlepopup' class='dle-promt' title='"+t+"' style='display:none'>"+e+"<br /><br /><input type='text' name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;' value='"+o+"'/></div>"),$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-promt",buttons:d}),$(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup").dialog("option","position",{my:"center",at:"center",of:window}),(0<o.length?$("#dle-promt-text").select():$("#dle-promt-text")).focus()}var dle_user_profile="",dle_user_profile_link="";function ShowPopupProfile(e,o){var t={};return t[menu_profile]=function(){document.location=dle_user_profile_link},5!=dle_group&&(t[menu_send]=function(){DLESendPM(dle_user_profile)}),1==o&&(t[menu_uedit]=function(){$(this).dialog("close");var e={};return $("body").append('<div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #666666; opacity: .40;filter:Alpha(Opacity=40); z-index: 999; display:none;"></div>'),$("#modal-overlay").css({filter:"alpha(opacity=40)"}).fadeIn("slow"),$("#dleuserpopup").remove(),$("body").append("<div id='dleuserpopup' title='"+menu_uedit+"' style='display:none'></div>"),e[dle_act_lang[3]]=function(){$(this).dialog("close"),$("#dleuserpopup").remove()},e[dle_act_lang[5]]=function(){window.frames.edituserframe.confirmDelete(dle_login_hash)},e[dle_act_lang[4]]=function(){document.getElementById("edituserframe").contentWindow.document.getElementById("saveuserform").submit()},$("#dleuserpopup").dialog({autoOpen:!0,width:700,resizable:!1,dialogClass:"modalfixed dle-popup-userprofileadmin",buttons:e,open:function(e,o){$("#dleuserpopup").html("<iframe name='edituserframe' id='edituserframe' width='100%' height='400' src='"+dle_root+dle_admin+"?mod=editusers&action=edituser&user="+dle_user_profile+"&skin="+dle_skin+"' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>")},beforeClose:function(e,o){$("#dleuserpopup").html("")},close:function(e,o){$("#modal-overlay").fadeOut("slow",function(){$("#modal-overlay").remove()})}}),830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dleuserpopup").dialog("option","position",{my:"center",at:"center",of:window})),!1}),$("#dleprofilepopup").remove(),$("body").append(e),$("#dleprofilepopup").dialog({autoOpen:!0,resizable:!1,dialogClass:"dle-popup-userprofile",buttons:t,width:550}),!1}function ShowProfile(e,o,t){return dle_user_profile==e&&document.getElementById("dleprofilepopup")?$("#dleprofilepopup").dialog("open"):(dle_user_profile=e,dle_user_profile_link=o,ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=profile",{name:e,skin:dle_skin,user_hash:dle_login_hash},function(e){HideLoading(""),ShowPopupProfile(e,t)})),!1}function FastSearch(){$("#story").attr("autocomplete","off"),$("#story").blur(function(){$("#searchsuggestions").fadeOut()}),$("#story").keyup(function(){var e=$(this).val();0==e.length?$("#searchsuggestions").fadeOut():dle_search_value!=e&&e.length>=dle_min_search&&(clearInterval(dle_search_delay),dle_search_delay=setInterval(function(){dle_do_search(e)},600))})}function dle_do_search(e){clearInterval(dle_search_delay),$("#searchsuggestions").remove(),$("body").append("<div id='searchsuggestions' style='display:none'></div>"),$.post(dle_root+"engine/ajax/controller.php?mod=search",{query:""+e,user_hash:dle_login_hash},function(e){$("#searchsuggestions").html(e).fadeIn().css({position:"absolute",top:0,left:0}).position({my:"left top",at:"left bottom",of:"#story",collision:"fit flip"})}),dle_search_value=e}function ShowLoading(e){$("#loading-layer").remove(),$("body").append("<div id='loading-layer' style='display:none'></div>"),e?$("#loading-layer").html(e):$("#loading-layer").html(dle_act_lang[6]);var o=($(window).width()-$("#loading-layer").width())/2,e=($(window).height()-$("#loading-layer").height())/2;$("#loading-layer").css({left:o+"px",top:e+"px",position:"fixed",zIndex:"99"}),$("#loading-layer").fadeTo("slow",.6)}function HideLoading(e){$("#loading-layer").fadeOut("slow",function(){$("#loading-layer").remove()})}function ShowAllVotes(){return document.getElementById("dlevotespopup")?$("#dlevotespopup").dialog("open"):($.ajaxSetup({cache:!1}),ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=allvotes&dle_skin="+dle_skin,function(e){HideLoading(""),$("#dlevotespopup").remove(),$("body").append(e),$(".dlevotebutton").button(),$("#dlevotespopup").dialog({autoOpen:!0,resizable:!1,dialogClass:"dle-popup-allvotes",width:600}),400<$("#dlevotespopupcontent").height()&&$("#dlevotespopupcontent").height(400),$("#dlevotespopup").dialog("option","height",$("#dlevotespopupcontent").height()+60),$("#dlevotespopup").dialog("option","position","center")})),!1}function fast_vote(o){var e=$("#vote_"+o+" input:radio[name=vote_check]:checked").val();return void 0===e||(ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=vote",{vote_id:o,vote_action:"vote",vote_mode:"fast_vote",vote_check:e,dle_skin:dle_skin,user_hash:dle_login_hash},function(e){HideLoading(""),$("#dle-vote_list-"+o).fadeOut(500,function(){$(this).html(e),$(this).fadeIn(500)})})),!1}function AddIgnorePM(e,o){DLEconfirm(o,dle_confirm,function(){ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=pm",{id:e,action:"add_ignore",skin:dle_skin,user_hash:dle_login_hash},function(e){return HideLoading(""),DLEalert(e,dle_info),!1})})}function DelIgnorePM(o,e){return DLEconfirm(e,dle_confirm,function(){ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=pm",{id:o,action:"del_ignore",skin:dle_skin,user_hash:dle_login_hash},function(e){return HideLoading(""),$("#dle-ignore-list-"+o).html(""),DLEalert(e,dle_info),!1})}),!1}function DelSocial(o,e){return DLEconfirm(e,dle_confirm,function(){ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=adminfunction",{id:o,action:"del_social",user_hash:dle_login_hash},function(e){return HideLoading(""),$("#dle-social-list-"+o).html(""),DLEalert(e,dle_info),!1})}),!1}function subscribe(e){return DLEconfirm(dle_sub_agree,dle_confirm,function(){ShowLoading(""),$.get(dle_root+"engine/ajax/controller.php?mod=commentssubscribe",{news_id:e,skin:dle_skin,user_hash:dle_login_hash},function(e){HideLoading(""),e.success?DLEalert(e.info,dle_info):e.error&&DLEalert(e.errorinfo,dle_info)},"json")}),!1}function media_upload(t,i,n,d){var l=(new Date).getTime(),a="none";return $("#mediaupload").remove(),$("body").append("<div id='mediaupload' title='"+text_upload+"' style='display:none'></div>"),$("#mediaupload").dialog({autoOpen:!0,width:710,resizable:!1,dialogClass:"modalfixed dle-popup-upload",open:function(e,o){$("#mediaupload").html("<iframe name='mediauploadframe' id='mediauploadframe' width='100%' height='580' src='"+dle_root+"engine/ajax/controller.php?mod=upload&area="+t+"&author="+i+"&news_id="+n+"&wysiwyg="+d+"&skin="+dle_skin+"&rndval="+l+"' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>"),$(".ui-dialog").draggable("option","containment","")},dragStart:function(e,o){a=$(".modalfixed").css("box-shadow"),$(".modalfixed").fadeTo(0,.6).css("box-shadow","none"),$("#mediaupload").css("visibility","hidden")},dragStop:function(e,o){$(".modalfixed").fadeTo(0,1).css("box-shadow",a),$("#mediaupload").css("visibility","visible")},beforeClose:function(e,o){$("#mediaupload").html("")}}),830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#mediaupload").dialog("option","position",{my:"center",at:"center",of:window})),!1}function dropdownmenu(e,o,t,i){window.event?event.cancelBubble=!0:o.stopPropagation&&o.stopPropagation();o=$("#dropmenudiv");if(o.is(":visible"))return clearhidemenu(),o.fadeOut("fast"),!1;o.remove(),$("body").append('<div id="dropmenudiv" style="display:none;position:absolute;z-index:100;width:165px;"></div>'),(o=$("#dropmenudiv")).html(t.join("")),i&&o.width(i);t=$(document).width()-30,i=$(e).offset();return t-i.left<o.width()&&(i.left=i.left-(o.width()-$(e).width())),o.css({left:i.left+"px",top:i.top+$(e).height()+"px"}),o.fadeTo("fast",.9),o.mouseenter(function(){clearhidemenu()}).mouseleave(function(){delayhidemenu()}),$(document).one("click",function(){hidemenu()}),!1}function setcookie(e,o){var t=new Date;t.setTime(t.getTime()+26784e5);t="expires="+t.toUTCString();document.cookie=e+"="+o+";"+t+";path=/"}function get_local_storage(e){try{return localStorage.getItem(e)?JSON.parse(localStorage.getItem(e)):null}catch(e){return null}}function set_local_storage(e,o){try{localStorage.setItem(e,JSON.stringify(o))}catch(e){}}function del_local_storage(e,o){try{localStorage.removeItem(e)}catch(e){}}function save_last_viewed(e){if(e=parseInt(e),isNaN(e))return null;var o=get_local_storage("viewed_ids");return $.isArray(o)?-1==$.inArray(e,o)&&(19<o.length&&o.pop(),o.unshift(e)):(o=[]).push(e),set_local_storage("viewed_ids",o),setcookie("viewed_ids",o.join()),!0}function hidemenu(e){$("#dropmenudiv").fadeOut("fast")}function delayhidemenu(){delayhide=setTimeout("hidemenu()",1e3)}function clearhidemenu(){"undefined"!=typeof delayhide&&clearTimeout(delayhide)}jQuery(function(i){var t=!1,e=new Array,n="";i(document).keydown(function(e){if(13==e.which&&e.ctrlKey){var o;if(e.preventDefault(),window.getSelection?o=window.getSelection():document.getSelection?o=document.getSelection():document.selection&&(o=document.selection.createRange().text),""==o)return!1;if(255<o.toString().length)return DLEalert(dle_big_text,dle_info),!1;e={};e[dle_act_lang[3]]=function(){i(this).dialog("close")},e[dle_p_send]=function(){var e,o,t;i("#dle-promt-text").val().length<1?i("#dle-promt-text").addClass("ui-state-error"):(e=i("#dle-promt-text").val(),o=i("#orfom").text(),t="",i("#dle-promt-mail").val()&&(t=i("#dle-promt-mail").val()),i(this).dialog("close"),i("#dlepopup").remove(),i.post(dle_root+"engine/ajax/controller.php?mod=complaint",{seltext:o,text:e,mail:t,user_hash:dle_login_hash,action:"orfo",url:window.location.href},function(e){DLEalert("ok"==e?dle_p_send_ok:e,dle_info)}))},i("#dlepopup").remove(),5==dle_group&&(n=dle_mail+'<br><input type="text" name="dle-promt-mail" id="dle-promt-mail" class="ui-widget-content ui-corner-all" style="width:100%;" value="">'),i("body").append("<div id='dlepopup' class='dle-promt' title='"+dle_c_title+"' style='display:none'>"+dle_orfo_title+"<br><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:100%;height:80px;'></textarea>"+n+"<div id='orfom' style='display:none'>"+o+"</div></div>"),i("#dlepopup").dialog({autoOpen:!0,width:600,resizable:!1,dialogClass:"modalfixed dle-popup-complaint",buttons:e}),i(".modalfixed.ui-dialog").css({position:"fixed"}),i("#dlepopup").dialog("option","position",{my:"center",at:"center",of:window})}}),setTimeout(function(){i("img[data-maxwidth]").each(function(){var e=i(this).width(),o=i(this).data("maxwidth");i(this)[0].naturalWidth&&(e=i(this)[0].naturalWidth),o<e&&(i(this).width(o),i(this).wrap('<a href="'+i(this).attr("src")+'" onclick="return hs.expand(this)"></a>'),"undefined"==typeof hs&&0==t&&(t=!0,i.getScript(dle_root+"engine/classes/highslide/highslide.js",function(){hs.graphicsDir=dle_root+"engine/classes/highslide/graphics/",hs.numberOfImagesToPreload=0,hs.captionEval="this.thumb.alt",hs.showCredits=!1,hs.align="center",hs.transitions=["expand","crossfade"]})))})},300),setTimeout(function(){i("div[data-dlebclicks]").each(function(){var e=i(this).data("dlebid");i(this).find("a").on("click",function(){i.post(dle_root+"engine/ajax/controller.php?mod=adminfunction",{id:e,action:"bannersclick",user_hash:dle_login_hash})})})},400),i("div[data-dlebviews]").each(function(){e.push(i(this).data("dlebid"))}),e.length&&setTimeout(function(){i.post(dle_root+"engine/ajax/controller.php?mod=adminfunction",{"ids[]":e,action:"bannersviews",user_hash:dle_login_hash})},1e3)});