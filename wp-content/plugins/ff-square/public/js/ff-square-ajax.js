(function( $ ){

    'use strict';

    let ffitems = 50;
    var init = 0;

    function stripHTML(dirtyString) {
        var container = document.createElement('div');
        var text = document.createTextNode(dirtyString);
        container.appendChild(text);
        return container.innerHTML; // innerHTML will be a xss safe string
    }

    function prettyDate(time){

        let d = new Date();
        // d.toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' });
        var date = new Date((time || "").toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' }).replace(/-/g,"/").replace(/[TZ]/g," ")),
        diff = ((d.getTime() + (d.getTimezoneOffset()*60000) - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

        if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
        return;

        return day_diff == 0 && (
            diff < 60 && "Zojuist" ||
            diff < 120 && "1 minuut geleden" ||
            diff < 3600 && Math.floor( diff / 60 ) + " minuten geleden" ||
            diff < 7200 && "1 uur geleden" ||
            diff < 86400 && Math.floor( diff / 3600 ) + " uur geleden") ||
            day_diff == 1 && "Gisteren" ||
            day_diff < 7 && day_diff + " dagen geleden" ||
            day_diff < 31 && Math.ceil( day_diff / 7 ) + " weken geleden";
        }

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === "class") {
                    var attributeValue = $(mutation.target).prop(mutation.attributeName);
                    if (attributeValue.indexOf(' in') > -1) {
                        initCard($(mutation.target));
                    }
                }
                if (mutation.attributeName === "style") {
                    var attributeValue = $(mutation.target).prop(mutation.attributeName);
                    // $(mutation.target).css('min-height', '100px');
                    // $(mutation.target).css('transform', '100px');
                    // console.log(attributeValue, mutation.target, $(mutation.target).index(), attributeValue.transform);
                    // $(mutation.target).css('transform').replace('')
                    // $(mutation.target).css({"transform": "translate3d(0px, " + -15 + "px, 0px)"});

                }
            });
        });

        //Mobile navigation toggle btn fix
        $.initialize('button.navbar-toggler', function() {
            var is_open = 0;
            $('button.navbar-toggler').on('click', function() {
                if (is_open) {
                    $('#navbar-wp').hide();
                    is_open = 0;
                } else {
                    $('#navbar-wp').show();
                    is_open = 1;
                }
            });
        });

        function initCard(card)
        {
            let post_id = card.attr('post-id');
            var index = card.index();

            jQuery.ajax({
                type : "post",
                dataType : "json",
                url : ff_square_ajax.ajaxurl,
                data : {
                    action: "ffs_comments_get",
                    post_id : post_id,
                    nonce: ff_square_ajax.comments_get_nonce,
                },
                success: function(response) {

                    if ($(response.votes).length > 0) {

                        if ($(response.votes)[0].vote) {
                            if ($(response.votes)[0].vote > 0) {
                                var vote = '+' + $(response.votes)[0].vote;
                            } else {
                                var vote = $(response.votes)[0].vote;
                            }
                        } else {
                            var vote = 0;
                        }

                        // if ($(response.votes)[0].upvotes) {
                        //     card.find('.picture-item__inner').find('.vote-holder').eq(0).find('h6').html('+ ' + $(response.votes)[0].upvotes);
                        // } else {
                        //     card.find('.picture-item__inner').find('.vote-holder').eq(0).find('h6').html(0);
                        // }
                        // if ($(response.votes)[0].downvotes) {
                        //     card.find('.picture-item__inner').find('.vote-holder').eq(1).find('h6').html('- ' + $(response.votes)[0].downvotes);
                        // } else {
                        //     card.find('.picture-item__inner').find('.vote-holder').eq(1).find('h6').html(0);
                        // }
                    } else {
                        var vote = 0;
                        // card.find('.picture-item__inner').find('.vote-holder').eq(1).find('h6').html(0);
                    }

                    card.find('.picture-item__inner').find('.vote-holder').eq(0).find('h6').html(vote);


                    // card.find('.picture-item__inner').find('.comments').find('h6').html($(response.comments).length + ((($(response.comments).length > 1) || ($(response.comments).length == 0)) ? ' reacties' : ' reactie'));
                    let html = '<span class="ff-square-card-meta"><a class="ff-timestamp">' + ($(response.comments).length + ((($(response.comments).length > 1) || ($(response.comments).length == 0)) ? ' reacties' : ' reactie')) + ' <b>Reageren</b></a></span>';
                    card.find('.picture-item__inner').find('.ff-item-meta').prepend(html);

                    // if ($(response.comments).length > 0) {

                    // card.find('.picture-item__inner').append('<div class="ff-square-comments-card"><h4 style="width:100%; display:inline-block;">Reacties (' + $(response.comments).length + ')</h4></div>');
                    html = '<div class="ff-square-comments-card ff-square-comments-list"><h6 style="width:50%; padding-top:15px; padding-left:20px; display:inline-block;">Reacties (' + $(response.comments).length + ')</h6><h6 class="ff-square-card-respond" style="width:50%; padding-top:15px; padding-right:20px;text-align:right; display:inline-block;">Plaats een reactie</h6></div>'
                    card.find('.picture-item__inner').append(html);



                    $(response.comments).each(function (key, item) {

                        html = '<div class="ff-square-comment" comment-id="' + item.id + '">'
                        + '<div class="ff-square-comment-body"><span class="ff-square-comment-text">' + item.comment + '</span></div>'
                        + '<div class="ff-square-comment-footer">'
                        + '<span style="display:inline-block;" class="vote"><i class="fas fa-thumbs-up"> </i></span>';

                        if ($(response.votes)[item.id]) {
                            html+= '<span style="display:inline-block; font-weight: 600;" class="vote-holder"> ' + $(response.votes)[item.id].vote +' </span>'
                        } else {
                            html+= '<span style="display:inline-block; font-weight: 600;" class="vote-holder">0</span>'
                        }
                        html+= '<span style="display:inline-block;" class="vote"><i class="fas fa-thumbs-down"> </i></span>'
                        + '<div class="ff-square-comment-header"><b class="ff-square-comment-username">' + item.user_nicename + '</b><span class="ff-square-comment-button" data-user-id="' + item.ID + '">Geef respect</span><span class="ff-square-comment-timestamp">' + prettyDate(item.created_at) + '</span></div>'
                        + '</div></div>';

                        $('li[post-id="' + post_id + '"] > div > div > div > .ff-square-comments-list').append(html);

                        //Html voor reacties onder card
                        card.find('.picture-item__inner').find('.ff-square-comments-card').append(html);

                    });

                    $('.ff-square-comment-button').on('click', function(e) {

                        e.stopImmediatePropagation();

                        let button = $(this);
                        let receiver = $(this).attr('data-user-id');

                        jQuery.ajax({
                            type : "post",
                            dataType : "json",
                            url : ff_square_ajax.ajaxurl,
                            data : {
                                action: "ffs_respect",
                                receiver : receiver,
                                nonce: ff_square_ajax.respect_nonce,
                            },
                            success: function(response) {

                                //Respect already given
                                if (response == 0) {

                                }
                                //Success
                                if (response == 1) {
                                    button.hide();
                                }
                                //User not logged in
                                if (response == -1) {

                                }
                            }
                        });
                    });

                    $('.ff-square-card-respond').on('click', function(e) {
                        e.stopImmediatePropagation();
                        let box = $(this).parents('.ff-square-comments-list');
                        box.scrollTop(box.prop("scrollHeight"));
                    });

                    let html_slide_vote = '<div class="ff-square-slide-vote-bar"><div class="col-md-4">'
                    + '<div class="col-4 like-button like-button-left vote"><div class="ff-square-bar-item"><h6><i class="fas fa-thumbs-up"></i></h6></div></div>'
                    + '<div class="col-4 like-button like-button-holder"><div class="ff-square-bar-item vote-holder"><h6>' + vote +'</h6></div></div>'
                    + '<div class="col-4 like-button like-button-right vote"><div class="ff-square-bar-item"><h6><i class="fas fa-thumbs-down"></i></h6></div></div></div></div>';

                    $('li[post-id="' + post_id + '"]').find('.ff-item-meta').append(html_slide_vote);

                    $('li[post-id="' + post_id + '"] > div > div > div > .ff-square-comments-list > h4').append(' (' + $(response.comments).length + ')');

                    //Reactie formulier onder card
                    html = '<div class="ff-square-commentbox row">'
                    + '<div class="col-md-12"><h3>Reageren</h3></div>';

                    if (ff_square_ajax.loggedin) {

                        html= '<div class="col-md-12" style="padding-top:10px;font-size:13px; color:black;">Je bent ingelogd als ' + ff_square_ajax.user.data.user_nicename + ' klik <a href="/wp-login.php?action=logout">hier</a> om uit te loggen</div>'
                        + '<div class="col-md-12"><textarea class="ff-square-commentbox-textarea" placeholder="Reactie..." required></textarea></div>'
                        + '<div class="col-md-12"><button class="ff-square-commentbox-button">Reactie plaatsen</button></div>'
                        + '</div>';
                    } else {
                        html= '<div class="ff-square-notice"></div><div class="col-md-12 ff-square-user-registration-form-element" style="padding-top:10px;font-size:13px; color:black;"><p><a href="/wp-login.php">Login</a> of maak een account aan om te reageren.</p></div>'
                        + '<div class="col-md-12 ff-square-user-registration-form-element"><textarea class="ff-square-commentbox-textarea" placeholder="Reactie..." required></textarea></div>'
                        + '<div class="col-md-12 ff-square-user-registration-form-element"><input type="text" name="name" placeholder="Naam" required/></div>'
                        + '<div class="col-md-12 ff-square-user-registration-form-element"><input type="email" name="email" placeholder="Email" required/></div>'
                        + '<div class="col-md-12 ff-square-user-registration-form-element"><p>Uw e-mailadres wordt niet gepubliceerd</p></div>'
                        + '<div class="col-md-12 ff-square-user-registration-form-element"><button class="ff-square-commentbox-button">Reactie plaatsen</button></div>'
                        + '</div>';
                    }
                    card.find('.picture-item__inner').find('.ff-square-comments-card').append(html);

                    $('.ff-square-comments-card').on('click', function(e) {
                        return false;
                    });

                    $('.ff-square-card-meta').on('click', function(e) {

                        e.stopImmediatePropagation();

                        let card = $(this).parents('article');
                        $('article').css('z-index', -1).css('opacity', 0.2);
                        card.css('z-index', 1).css('opacity', 1);

                        card.find('.picture-item__inner').find('.ff-square-comments-card').eq(0).css('display', 'block').animate(
                            {
                                height:'400px'
                            }, 200);

                    });

                    $('body').on('click', function(evt) {

                        if(evt.target.class == "ff-square-comments-card")
                        return;

                        //Close reaction section under card
                        $('article').css('z-index', 1).css('opacity', 1);
                        $('.ff-square-comments-card:visible').animate({
                            height: '0px'
                        }, 300).css('display', 'none');


                    });
                }
            })
        }



                function loadBlock1()
                {
                    jQuery.ajax({
                        type : "post",
                        dataType : "json",
                        url : ff_square_ajax.ajaxurl,
                        data : {
                            action: "ffs_block_get",
                            block: 1,
                            nonce: ff_square_ajax.block_get_nonce,
                        },
                        success: function(response) {



                            $('.ff-square-box-items').eq(0).html('');

                            if (response == 0) {
                                $('.ff-square-box-items').eq(0).append('<p>Geen berichten</p>');
                                return false;
                            }

                            var posts = {};

                            $(JSON.parse(response.posts)).each(function(key, item) {
                                posts[item.post_id] = item;
                            });

                            let list = [];
                            var block = [];


                            $(JSON.parse(response.comments)).each(function (key, item) {

                                if (posts[item.post_id] != null) {
                                    let html = '<div class="ff-square-box-item">'
                                    + '<p class="ff-square-box-item-post"><a class="ff-square-item-header" href="#" data-id="' + item.post_id + '">' + posts[item.post_id].post_header.substring(0, 90).replace(/\\/g,'') + '...</a></span>'
                                    + '<div><p class="ff-square-box-item-comment" data-item-id="' + item.comment.id + '">' + item.comment.substring(0, 110) + '...<span class="ff-square-box-item-time">' + prettyDate(item.created_at) + '</span></p></div>'
                                    + '</div>';

                                    block[item.post_id] = html;

                                    $('.ff-square-box-items').eq(0).append(html);

                                    list.push(item.post_id);
                                } else {
                                    // console.log("post_id:" + item.post_id, posts[item.post_id], posts[item.post_id]);
                                }
                            });

                            list = $.unique(list);

                            $.initialize('.ff-slideshow-media', function() {
                                $(list).each(function (key, item) {
                                    loadSlide(1, item, block[item]);
                                });
                            });

                        }
                    });
                }

                function loadBlock2(date, type)
                {

                    if (date == '') {
                        var date = 2;
                    } else {
                        var date = date.val();
                    }

                    if (type == '') {
                        var type = 0;
                    } else {
                        var type = type.val();
                    }

                    jQuery.ajax({
                        type : "post",
                        dataType : "json",
                        url : ff_square_ajax.ajaxurl,
                        data : {
                            action: "ffs_block_get",
                            block: 2,
                            after: date,
                            type: type,
                            nonce: ff_square_ajax.block_get_nonce,
                        },
                        success: function(response) {

                            $('.ff-square-box-items').eq(1).html('');

                            if (response == 0) {
                                $('.ff-square-box-items').eq(1).append('<p>Geen berichten</p>');
                                return false;
                            }

                            let votes = JSON.parse(response['votes']);

                            var block = [];
                            let posts = [];

                            $(JSON.parse(response['posts'])).each(function (key, item) {

                                let vote = votes[votes.findIndex(x => x.item_id === item.post_id)];

                                block.push([parseInt(vote.vote),'<div class="ff-square-box-item"><p class="ff-square-box-item-vote">'
                                + '<span class="ff-square-item-vote-span-placeholder"><span class="ff-square-item-vote-placeholder ff-square-item-vote-'+ (vote.vote > 0 ? 'up' : 'down') + '">' + (vote.vote > 0 ? '+ ' + vote.vote : vote.vote) + '</span></span>' + '<a class="ff-square-item-header" href="#" data-id="' + item.post_id + '">' + item.post_header.replace(/\\/g, '') + '...</a>'
                                +  '</p></div>']);

                                posts.push(item.post_id);

                            });

                            block.sort(function(a, b) {
                                if(a[0]== b[0]) return 0;
                                if ($('.select-type').eq(0).val() == 0) {
                                    return a[0]< b[0]? 1: -1;
                                }
                                return a[0]> b[0]? 1: -1;
                            }).map(function(a) {
                                a.shift();
                            });

                            $('.ff-square-box-items').eq(1).append(block.flat());

                            $.initialize('.ff-slideshow-media', function() {
                                $(posts).each(function (key, item) {
                                    loadSlide(2, item, block[key]);
                                });
                            });
                        }
                    });

                    $('.collapse-block').on('click', function() {
                        $('.' + $(this).attr('aria-controls')).collapse('toggle');
                    });
                }

                function loadBlock3(select)
                {

                    if (select == '') {
                        var date = 2;
                    } else {
                        var date = select.val();
                    }

                    jQuery.ajax({
                        type : "post",
                        dataType : "json",
                        url : ff_square_ajax.ajaxurl,
                        data : {
                            action: "ffs_block_get",
                            block: 3,
                            after: date,
                            nonce: ff_square_ajax.block_get_nonce,
                        },
                        success: function(response) {

                            $('.ff-square-box-items').eq(2).html('');

                            if (response == 0) {
                                $('.ff-square-box-items').eq(2).append('<p>Geen hot topics</p>');
                                return false;
                            }

                            var comments = {};

                            $(JSON.parse(response.comments)).each(function(key, item) {

                                comments[item.post_id] = item;
                            });

                            let block = [];
                            let posts = [];

                            $(JSON.parse(response.posts)).each(function(key,item) {

                                block.push([parseInt(comments[item.post_id].comments), '<div class="ff-square-box-item"><p class="ff-square-box-item-vote">'
                                + '<span class="ff-square-item-vote-span-placeholder" style="float:right;">'
                                + '<span class="fa-stack fa-xs ff-square-fastack"><i class="far fa-comment-alt fa-stack-2x"></i><i class="fa fa-stack-1x" style="font-family: sans-serif;font-weight: 700;">'+ comments[item.post_id].comments +'</i></span></span>'
                                // + '<span class="ff-square-item-vote-placeholder ff-square-item-vote-up" style=" text-align:center;">''</span></span>'
                                + '<a class="ff-square-item-header" href="#" data-id="' + item.post_id + '"> '+ item.post_header.replace(/\\/g, '') + '...</a>'
                                +  '</p></div>']);

                                posts.push(item.post_id);
                            });

                            block.sort(function(a, b) {
                                if(a[0]== b[0]) return 0;
                                return a[0]< b[0]? 1: -1;
                            }).map(function(a) {
                                a.shift();
                            });


                            $('.ff-square-box-items').eq(2).append(block.flat());

                            $.initialize('.ff-slideshow-media', function() {
                                $(posts).each(function (key, item) {
                                    loadSlide(3, item, block[key]);
                                });
                            });
                        }
                    });
                }


                $.initialize('.ff-slideshow', function() {
                    $(this).append('<ul class="ff-square-slideshow-media"></ul>');

                    //Infinite Scroll
                    $(window).scroll(function() {

                        var top_of_element = $(".ff-loadmore-wrapper").offset().top - 100;
                        var bottom_of_element = $(".ff-loadmore-wrapper").offset().top + $(".ff-loadmore-wrapper").outerHeight();
                        var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
                        var top_of_screen = $(window).scrollTop();

                        if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){

                            if ($('.ff-btn').css('opacity') == 1) {
                                $('.ff-btn').click();
                            }
                        }
                    });
                });

                $.initialize('.ff-slideshow > ul > li', function() {

                    let html = '<div class="ff-square-comments-list"><h4 class="ff-square-comments-header">Reacties</h4></div>'
                    + '<div class="ff-square-commentbox row">'
                    + '<div class="col-md-12"><h3>Reageren</h3></div>';

                    if (ff_square_ajax.loggedin) {

                        html+= '<div class="col-md-12">Je bent ingelogd als ' + ff_square_ajax.user.data.user_nicename + ' klik <a href="/wp-login.php?action=logout">hier</a>om uit te loggen</div>'
                        + '<div class="col-md-12"><textarea class="ff-square-commentbox-textarea" placeholder="Reactie..." required></textarea></div>'
                        + '<div class="col-md-12"><button class="ff-square-commentbox-button">Reactie plaatsen</button></div>'
                        + '</div>';
                    } else {
                        html+= '<div class="col-md-12"><p><a href="/wp-login.php">Login</a>of maak een account aan om te reageren.</p></div>'
                        + '<div class="col-md-12"><textarea class="ff-square-commentbox-textarea" placeholder="Reactie..." required></textarea></div>'
                        + '<div class="col-md-12"><input type="text" name="name" placeholder="Naam" required/></div>'
                        + '<div class="col-md-12"><input type="email" name="email" placeholder="Email" required/></div>'
                        + '<div class="col-md-12"><p>Uw e-mailadres wordt niet gepubliceerd</p></div>'
                        + '<div class="col-md-12"><button class="ff-square-commentbox-button">Reactie plaatsen</button></div>'
                        + '</div>';
                    }

                    $(this).find('.ff-comments-list').append(html);

                });


                loadBlock1();

                $.initialize('#votes', function() {

                    if (init == 0) {

                        loadBlock2('', '');
                        loadBlock3('');

                        init = 1;
                    }

                    $('#hottopics select').on('change', function() {
                        loadBlock3($(this));
                    });

                    $('#votes select').on('change', function() {
                        if ($(this).hasClass('desktop')) {
                            loadBlock2($('#votes .select-date.desktop'), $('#votes .select-type.desktop'));
                        }
                        if ($(this).hasClass('mobile')) {
                            loadBlock2($('#votes .select-date.mobile'), $('#votes .select-type.mobile'));
                        }
                    });
                });

                $.initialize('.ff-item', function() {

                    let html = '<div class="row vote-bar" style="text-align:center; border-top:0px; padding:0px;">'
                    + '<div class="col-4 like-button like-button-left vote"><div class="ff-square-bar-item"><h6><i class="fas fa-thumbs-up"></i></h6></div></div>'
                    + '<div class="col-4 like-button like-button-holder"><div class="ff-square-bar-item vote-holder"><h6></h6></div></div>'
                    + '<div class="col-4 like-button like-button-right vote"><div class="ff-square-bar-item"><h6><i class="fas fa-thumbs-down"></i></h6></div></div></div>'
                    + '<div class="ff-item-bar reaction-bar" style="text-align:center; ">'
                    + '<div class="ff-square-bar-item comments"><h6></h6></div>'
                    + '<div class="ff-share-wrapper"><i class="ff-icon-share"></i><div class="ff-share-popup"><a href="http://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.instagram.com%2Fp%2FCG11rWbgOzp%2F" class="ff-fb-share" target="_blank" rel="noreferrer">Facebook</a><a href="https://twitter.com/share?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FCG11rWbgOzp%2F" class="ff-tw-share" target="_blank" rel="noreferrer">Twitter</a><a href="https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FCG11rWbgOzp%2F&amp;media=https%3A%2F%2Fscontent-muc2-1.cdninstagram.com%2Fv%2Ft51.29350-15%2F122586207_266242274816010_6979763166844425091_n.jpg%3F_nc_cat%3D107%26ccb%3D2%26_nc_sid%3D8ae9d6%26_nc_ohc%3DBIkLmwUUaU4AX_-3mve%26_nc_ht%3Dscontent-muc2-1.cdninstagram.com%26oh%3D1f3e0d8d9b0dd6e71540fc38f11438e8%26oe%3D5FBDC27A" class="ff-pin-share" target="_blank" rel="noreferrer">Pinterest</a><a href="https://www.linkedin.com/cws/share?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FCG11rWbgOzp%2F" class="ff-li-share" target="_blank" rel="noreferrer">Linkedin</a><a href="mailto:?subject=&amp;body=https%3A%2F%2Fwww.instagram.com%2Fp%2FCG11rWbgOzp%2F" class="ff-email-share">Email</a></div></div>'
                    + '</div>';

                    observer.observe($(this)[0], {
                        attributes: true
                    });

                    // observer.observe($(this).find('.ff-initial-image')[0], {
                    //     attributes: true
                    // });


                    $(this).find('.picture-item__inner').find('.ff-item-meta').append(html);



                });


                $.initialize('.vote', function(e) {

                    $(this).on('click', function(e) {

                        e.stopImmediatePropagation();

                        let item = $(this);
                        let slide = (item.parents('li').length > 0);

                        if (!slide) {
                            if (jQuery(this).parents('.ff-item').length) {

                                var type = 'item';
                                var item_id = jQuery(this).parent().parents('.ff-item').attr('post-id');
                                var vote = ($(this).index() == 0 ? 1 : -1);

                            } else {
                                var type = 'comment';
                                var item_id = $(this).parent().parents('.ff-square-comment').attr('comment-id');
                                var vote = ($(this).index() == 0 ? 1 : -1);
                            }
                        } else {
                            var type = 'item';
                            var item_id = item.parents('li').attr('post-id');
                            var vote = item.index() == 0 ? 1 : -1;
                        }

                        jQuery.ajax({
                            type : "post",
                            dataType : "json",
                            url : ff_square_ajax.ajaxurl,
                            data : {
                                action: "ffs_vote",
                                vote: vote,
                                type: type,
                                item_id : item_id,
                                nonce: ff_square_ajax.vote_nonce,
                            },
                            success: function(response) {

                                if (!response) {
                                    return false;
                                }
                                if (type == 'comment') {
                                    var cvote = parseInt(item.siblings('.vote-holder').html());
                                    cvote+= vote;
                                    item.siblings('.vote-holder').html(cvote);
                                }
                                if (type == 'item') {

                                    if (slide) {

                                        var cvote = parseInt(item.parents('.ff-square-slide-vote-bar').find('.vote-holder').find('h6').html().replace(' ', ''));
                                        cvote+= vote;
                                        if (cvote > 0) { cvote = "+ " + cvote; }
                                        item.parents('.ff-square-slide-vote-bar').find('.vote-holder').find('h6').html(cvote);

                                    } else {
                                        var cvote = parseInt(item.parents('.vote-bar').find('.vote-holder').find('h6').html().replace(' ', ''));
                                        cvote+= vote;
                                        if (cvote > 0) { cvote = "+ " + cvote; }
                                        item.parents('.vote-bar').find('.vote-holder').find('h6').html(cvote);
                                    }

                                }
                            }
                        });
                        return false;
                    });
                });

                $.initialize('.ff-square-commentbox-button', function(e) {

                    let button = $(this);

                    $(this).on('click', function(e) {

                        e.preventDefault();

                        //if card open
                        let post_id = ((button.parents('li').length == 0) ? button.parents('article').attr('post-id') : button.parents('li').attr('post-id'));
                        let parentd = ((button.parents('li').length != 0) ? button.closest('.ff-square-commentbox') : button.closest('.ff-square-comments-list'))

                        jQuery.ajax({
                            type : "post",
                            dataType : "json",
                            url : ff_square_ajax.ajaxurl,
                            data : {
                                action: "ffs_comment_create",
                                post_id : post_id,
                                comment : parentd.find('textarea').val(),
                                name: parentd.find('input[name="name"]').val(),
                                // website: button.closest('.ff-square-commentbox').find('input[name="website"]').val(),
                                email: parentd.find('input[name="email"]').val(),
                                // remember: button.closest('.ff-square-commentbox').find('input[name="remember"]').val(),
                                nonce: ff_square_ajax.comment_create_nonce,
                            },
                            success: function(response) {

                                if (response == -1) {
                                    jQuery('.ff-square-commentbox').html('<div class="col-md-12">Er bestaat al een account met dit emailadres. <a href="/wp-login.php"> Log in</a> op het account om een bericht te plaatsen.</div>');
                                    return false;
                                }

                                if (response == 0) {
                                    parentd.find('.ff-square-user-registration-form-element').hide();
                                    parentd.find('.ff-square-notice').html('<div class="col-md-12">We hebben uw een mail gestuurd. Verifieer uw email om het bericht te plaatsen.</div>');
                                    jQuery('.ff-square-commentbox').html('<div class="col-md-12">We hebben uw een mail gestuurd. Verifieer uw email om het bericht te plaatsen.</div>');
                                    return false;
                                }

                                //HIER
                                let html = '<div class="ff-square-comment" comment-id="' + response.id + '">'
                                + '<div class="ff-square-comment-header"><b class="ff-square-comment-username">' + response.name + '</b><span class="ff-square-comment-timestamp">' + prettyDate(response.created_at) + '</span></div>'
                                + '<div class="ff-square-comment-body"><span class="ff-square-comment-text">' + response.comment + '</span></div>'
                                + '<div class="ff-square-comment-footer">'
                                + '<span style="display:inline-block;" class="vote"><i class="fas fa-thumbs-up"> </i></span>'
                                + '<span style="display:inline-block; font-weight: 600;" class="vote-holder">0</span>'
                                + '<span style="display:inline-block;" class="vote"><i class="fas fa-thumbs-down"></i></span>'
                                + '</div></div>';

                                //Dit voegt het niet toe bij de card en de slide
                                if (button.parents('li').length) {
                                    button.parents('li').closest('.ff-square-comments-list').append(html);
                                } else {
                                    button.parents('.ff-item').find('.ff-square-comments-list').find('h6').eq(1).after(html);
                                }

                                //Een reactie per gebruiker?
                                button.closest('.ff-square-comments-list').find('.col-md-12').hide();
                                button.closest('.ff-square-comments-list').append('<div class="col-md-12" style="background-color: #d2d2d2; padding-top:20px; padding-bottom:10px;color:black;"><p>Bedankt voor je reactie!</p></div>');



                            }
                        });
                    });
                });

                function createSlide(post)
                {

                    var html = '<li data-type="' + post.post_type + '" post-id="' + post.post_id + '" data-feed="" class="ff-supports-comments ffs-slide ff-slide-youtube ff-slide-media" style="transform: translate3d(-50%, -50%, 0px);">'
                    + '<div class="ff-slide-wrapper" style="max-height: 420px;">'
                    + '<div class="ff-media-wrapper ' + (post.post_type == 'video' ? "ff-video" : "") + '" style="max-height: 338px;">';

                    if (post.media_type == 'video') {
                        html+= '<iframe width="600" height="338" src="//' + post.media_url + '?version=3&amp;f=videos&amp;autoplay=0&amp;fs=1&amp;enablejsapi=1&amp;mute=0" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" webkitallowfullscreen="" mozallowfullscreen="" autoplay="1" wmode="opaque" data-controls="true" allow="encrypted-media"></iframe>';

                    }
                    if (post.post_type == 'rss') {
                        html+= '<span class="ff-img-holder  ff-img-landscape" style="width: 300px; max-height: 169px; height: 169px;"><img class="ff-initial-image" src="' + post.media_url + '"></span>';
                    }


                    html+= '</div>'
                    + '<div class="ff-item-cont" style="height: 420px;">'
                    + '<h6 class="ff-label-wrapper"></h6>'
                    + '<div class="ff-item-meta">'
                    + '<span class="ff-userpic" style="background:url(' + post.user_pic + ')"><i class="ff-icon ff-label-user_timeline"><i class="ff-icon-inner"><span class="ff-label-text">youtube</span></i></i><i class="ff-icon ff-label-user_timeline"><i class="ff-icon-inner"></i></i></span>'
                    + '<h6></h6>'
                    + '<a rel="noreferrer" href="https://www.youtube.com/user/NUnl" class="ff-nickname" target="_blank">NU.nl</a>'
                    + '<div class="ff-content not-empty">'
                    + '<h4><a rel="noreferrer" href="' + post.post_permalink + '" target="_blank">' + post.post_header.replace(/\\/g, '') + '</a></h4>'
                    + post.post_text.replace(/\\/g, '')
                    + '</div>'
                    + '<div class="ff-item-bar" style="text-align:center; ">'
                    + '<div class="ff-square-bar-item comments">'
                    + '<h6></h6>'
                    + '</div>'
                    + '<a rel="noreferrer" href="https://www.youtube.com/watch?v=U10Yel3QlrM" class="ff-timestamp" target="_blank">Yesterday</a>'
                    + '</div>'
                    + '<div class="ff-dropdown">'
                    + '<a rel="noreferrer" href="https://www.youtube.com/watch?v=U10Yel3QlrM" class="ff-external-link" target="_blank">View on youtube</a>'
                    + '<div class="ff-share-wrapper">'
                    + '<i class="ff-icon-share"></i>'
                    + '<div class="ff-share-popup"><a href="http://www.facebook.com/sharer.php?u=" class="ff-fb-share" target="_blank" rel="noreferrer">Facebook</a><a href="https://twitter.com/share?text=titel;url=urlpost" class="ff-tw-share" target="_blank" rel="noreferrer">Twitter</a><a href="https://www.pinterest.com/pin/create/button/?url=" class="ff-pin-share" target="_blank" rel="noreferrer">Pinterest</a><a href="https://www.linkedin.com/cws/share?url=" class="ff-li-share" target="_blank" rel="noreferrer">Linkedin</a><a href="mailto:?subject=encodetitle;body=linknaarpost" class="ff-email-share">Email</a></div>'
                    + '</div>'
                    + '<span class="flaticon-share2"></span>'
                    + '</div>'
                    + '</div>'
                    + '<div class="ff-comments-list"><div class="ff-comments-list-inner"><div class="ff-slide-loader"><span>Loading...</span></div></div></div>';
                    + '</div>'
                    + '<div class="square-box"></div>'
                    + '</div>'
                    + '</li>';

                    return html;
                }

                function loadSlide(blockid, post_id, a)
                {
                    jQuery.ajax({
                        type : "post",
                        dataType : "json",
                        url : ff_square_ajax.ajaxurl,
                        data : {
                            action: "ffs_fetch_post",
                            post_id: post_id,
                            nonce: ff_square_ajax.fetch_post_nonce,
                        },
                        success: function(response) {

                            var cardExists = 0;

                            //Check if card/post already exists otherwise add
                            if ($('li[post-id="' + post_id + '"]').length == 0 ) {

                                var post = createSlide(response[0]);

                                $('.ff-square-slideshow-media').append(post);
                                loadComments(post_id);


                                let html_slide_vote = '<div class="ff-square-slide-vote-bar"><div class="col-md-4">'
                                + '<div class="col-4 like-button like-button-left vote"><div class="ff-square-bar-item"><h6><i class="fas fa-thumbs-up"></i></h6></div></div>'
                                + '<div class="col-4 like-button like-button-holder"><div class="ff-square-bar-item vote-holder"><h6>0</h6></div></div>'
                                + '<div class="col-4 like-button like-button-right vote"><div class="ff-square-bar-item"><h6><i class="fas fa-thumbs-down"></i></h6></div></div></div></div>';

                                $('li[post-id="' + post_id + '"]').find('.ff-item-meta').append(html_slide_vote);

                            } else {
                                cardExists = 1;
                            }

                            $(document).on('click', '.ff-square-item-header', function(e) {
                                // $('.ff-square-item-header').on('click', function() {

                                e.stopImmediatePropagation();

                                let post_id = $(this).attr('data-id');

                                if ($('.ff-slideshow-media li[post-id="' + post_id + '"]').length > 0 ) {

                                    $('article[post-id="' + $(this).attr('data-id') + '"]').eq(0).click();
                                } else {
                                    $('li[post-id="' + $(this).attr('data-id') + '"]').addClass('ff-current').addClass('ff-show');
                                    $('body').addClass('ff-modal-open');
                                    $('.ff-square-slideshow-media').css('z-index', 100);
                                    $('.ff-slideshow').addClass('ff-slideshow-open');
                                    $('.ff-nav-next').css('display', 'none');
                                    $('.ff-nav-prev').css('display', 'none');
                                }

                            });

                            $('.ff-nav-close').on('click', function() {
                                $('.ff-current').removeClass('ff-show').removeClass('ff-current');
                                $('.ff-square-slideshow-media').css('z-index', -1);
                                $('.ff-nav-next').css('display', 'block');
                                $('.ff-nav-prev').css('display', 'block');
                            });
                        }
                    });
                }

                function loadComments(post_id) {

                    jQuery.ajax({
                        type : "post",
                        dataType : "json",
                        url : ff_square_ajax.ajaxurl,
                        data : {
                            action: "ffs_comments_get",
                            post_id : post_id,
                            nonce: ff_square_ajax.comments_get_nonce,
                        },
                        success: function(response) {

                            let vote = ($(response.votes).length > 0 ? '+ ' + $(response.votes).length : $(response.votes).length);

                            if ($(response.comments).length == 0) {
                                $('li[post-id="' + post_id + '"] > div > div > div > .ff-square-comments-list').append('<p class="ff-square-comments-header">Wees de eerste die een reactie achterlaat!</p>');
                            }

                            let votes = {}

                            $(response.votes).each(function (key, item) {
                                votes[item.item_id] = item;
                            });

                            $(response.comments).each(function (key, item) {

                                let html = '<div class="ff-square-comment-body"><span class="ff-square-comment-text">' + item.comment + '</span></div>'
                                + '<span style="display:inline-block;" class="vote"><i class="fas fa-thumbs-up"> </i></span>';

                                if (votes[item.post_id] != null) {

                                    // let vote = (parseInt(votes[item.post_id].upvotes) - parseInt(votes[item.post_id].downvotes));
                                    let vote = parseInt(votes[item.post_id].vote);
                                    html+= '<span style="display:inline-block; font-weight: 600;" class="vote-holder"> ' + vote +' </span>'
                                } else {
                                    html+= '<span style="display:inline-block; font-weight: 600;" class="vote-holder">0</span>'
                                }
                                html+= '<span style="display:inline-block;" class="vote"><i class="fas fa-thumbs-down"> </i></span>'
                                + '<div class="ff-square-comment" comment-id="' + item.comment_id + '">'
                                + '<div class="ff-square-comment-header"><b class="ff-square-comment-username">' + item.user_nicename + '</b><span class="ff-square-comment-timestamp">' + prettyDate(item.created_at) + '</span></div>'
                                + '<div class="ff-square-comment-footer">'
                                + '</a>'
                                + '</div></div>';

                                $('li[post-id="' + post_id + '"] > div > div > div > .ff-square-comments-list').append(html);
                            });

                            $('li[post-id="' + post_id + '"] > div > div > div > .ff-square-comments-list > h4').append(' (' + $(response.comments).length + ')');
                        }
                    });
                }


            })( jQuery );
