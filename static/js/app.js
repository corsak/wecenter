var document_title;$(document).ready(function (){    document_title = document.title;    // fix form bug...    $("form[action='']").attr('action', window.location.href);    if ($('#captcha').length)    {        $('#captcha').click();    }        $('.tooltip').tooltip();    if (typeof (G_NOTIFICATION_INTERVAL) != 'undefined')    {        check_notifications();        setInterval('check_notifications()', G_NOTIFICATION_INTERVAL);    }    $('a[rel=lightbox]').fancybox(    {        openEffect: 'none',        closeEffect: 'none',        prevEffect: 'none',        nextEffect: 'none',        closeBtn: false,        helpers:        {            buttons:            {                position: 'bottom'            }        },        afterLoad: function ()        {            this.title = '第 ' + (this.index + 1) + ' 张, 共 ' + this.group.length + ' 张' + (this.title ? ' - ' + this.title : '');        }    });		if (window.location.hash.indexOf('#!') != -1)	{		if ($('a[name=' + window.location.hash.replace('#!', '') + ']').length)		{			$.scrollTo($('a[name=' + window.location.hash.replace('#!', '') + ']').offset()['top'] - 20, 600, {queue:true});		}	}	    init_comment_box('.aw-add-comment');    init_topic_edit_box('.aw-edit-topic');	    /*用户头像提示box*/    show_card_box('.aw-user-name, .aw-user-img', 'user');    show_card_box('.aw-topic-name, .aw-topic-img', 'topic');        //动态绑定给用户头像提示box事件    $(document).on('mouseover', '#aw-card-tips', function ()    {        clearTimeout(cardBoxTimeout);        $(this).show();    });        $(document).on('mouseout', '#aw-card-tips', function ()    {        $(this).hide();    });        /*加关注icon提示*/    $(document).on('mouseover', '.i-follow , .i-up , .i-down , .aw-icon-no-help-tips , .aw-icon-thank-tips', function ()    {        $(this).tooltip('show');    });	    //话题编辑下拉菜单mouseover click事件动态绑定    $(document).on('mouseover', '.aw-topic-dropdown-list li', function ()    {        $('.aw-edit-topic-box #aw_edit_topic_title').val($(this).text());    });    $(document).on('click', '.aw-topic-dropdown-list li', function ()    {        $('.aw-edit-topic-box #aw_edit_topic_title').val($(this).text());        $('.aw-edit-topic-box .submit-edit').click();        $('.aw-edit-topic-box .aw-topic-dropdown').hide();    });    //分享私信用户下拉点击事件动态绑定    $(document).on('click','.aw-share-box-message .aw-user-dropdown-list li a, .aw-inbox .aw-user-dropdown-list li a',function(){    	$('.alert-box #quick_publish .input').val($(this).text());    	$(this).parents('.aw-user-dropdown').hide();    });        //搜索下拉    search_tips('#aw-search-query', 5);    //ie浏览器下input,textarea兼容    if (document.all)    {        $('input,textarea').each(function ()        {            if (typeof ($(this).attr("placeholder")) != "undefined")            {                $(this).addClass('aw-placeholder').val($(this).attr("placeholder"));                $(this).focus(function ()                {                    if ($(this).val() == $(this).attr('placeholder'))                    {                        $(this).removeClass('aw-placeholder').val('');                    }                });                $(this).blur(function ()                {                    if ($(this).val() == '')                    {                        $(this).addClass('aw-placeholder').val($(this).attr('placeholder'));                    }                });            }        });    }        if (typeof (myMarkdownSettings) != 'undefined' && document.getElementById('advanced_editor'))    {        $('#advanced_editor').markItUp(myMarkdownSettings);        $.setEditorPreview();        setInterval(function ()        {            if (advanced_editor != null)            {                advanced_editor.save();                                $('#markItUpPreviewFrames').html(Markdown($('#advanced_editor').val()));            }            var content = $('#advanced_editor').val().split(/\r?\n/);            if (content.length > 5 && content.length < 30)            {                $('#advanced_editor').height(content.length * 21).css('overflow', 'hidden');            }            else if (content.length >= 30)            {                $('#advanced_editor').height(30 * 21).css('overflow', 'auto');            }        }, 500);    }    else if (document.getElementById('markItUpPreviewFrame'))    {        $('#markItUpPreviewFrame').hide();    }});//用户小卡片关注更新缓存$(document).on('click', '.aw-card-tips-user .focus', function (){    var uid = $(this).parents('.aw-card-tips').find('.name').attr('data-id');        $.each(cashUserData, function (i, a)    {        //存在缓存        if (a.match('data-id="' + uid + '"'))        {            if (cashUserData.length == 1)            {                cashUserData = [];            }            else            {                cashUserData[i] = '';            }        }    });});//话题小卡片关注更新缓存$(document).on('click', '.aw-card-tips-topic .focus', function (){    var topic_id = $(this).parents('.aw-card-tips').find('.name').attr('data-id');        $.each(cashTopicData, function (i, a)    {        //存在缓存        if (a.match('data-id="' + topic_id + '"'))        {            if (cashTopicData.length == 1)            {                cashTopicData = [];            }            else            {                cashTopicData[i] = '';            }        }    });});$(window).scroll(function (){    if ($('.aw-back-top').length)    {        if ($(window).scrollTop() > ($(window).height() / 2))        {            $('.aw-back-top').fadeIn();        }        else        {            $('.aw-back-top').fadeOut();        }    }});