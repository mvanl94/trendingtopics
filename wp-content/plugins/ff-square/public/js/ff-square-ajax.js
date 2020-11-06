(function( $ ){

    'use strict';

    let ffitems = 50;
    var init = 0;

    function prettyDate(time){

        let d = new Date();
        var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
        diff = ((d.getTime() + (d.getTimezoneOffset()*60000) - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
        if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
        return;

        return day_diff == 0 && (
            diff < 60 && "just now" ||
            diff < 120 && "1 min ago" ||
            diff < 3600 && Math.floor( diff / 60 ) + " mins ago" ||
            diff < 7200 && "1 hour ago" ||
            diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
            day_diff == 1 && "Yesterday" ||
            day_diff < 7 && day_diff + " days ago" ||
            day_diff < 31 && Math.ceil( day_diff / 7 ) + " week ago";
        }


        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === "class") {
                    var attributeValue = $(mutation.target).prop(mutation.attributeName);
                    if (attributeValue.indexOf(' in') > -1) {
                        initCard($(mutation.target));
                    }
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

                    let vote = ($(response.votes).length > 0 ? '+ ' + $(response.votes).length : $(response.votes).length);
                    card.find('.picture-item__inner').find('.vote-holder').find('h6').html(vote);
                    card.find('.picture-item__inner').find('.comments').find('h6').html($(response.comments).length + ' reacties');

                    $(response.comments).each(function (key, item) {
                        let html = '<div class="ff-square-comment" comment-id="' + item.id + '">'
                        + '<span style="display:inline-block;" class="vote"><i class="fas fa-plus-square"> </i></span>';

                        if ($(response.votes)[item.id]) {
                            html+= '<span style="display:inline-block; font-weight: 600;" class="vote-holder"> ' + $(response.votes)[item.id].vote +' </span>'
                        } else {
                            html+= '<span style="display:inline-block; font-weight: 600;" class="vote-holder">0</span>'
                        }
                        html+= '<span style="display:inline-block;" class="vote"><i class="fas fa-minus-square"> </i></span>'
                        + '<b>' + item.name + '</b></a><span>' + item.comment + '</span>'
                        + '</div>';
                        $('li[post-id="' + post_id + '"] > div > div > div > .ff-square-comments-list').append(html);
                    });

                    initVote($(card.find('.picture-item__inner').find('.vote')[0]));
                    initVote($(card.find('.picture-item__inner').find('.vote')[1]));

                    $('li[post-id="' + post_id + '"] > div > div > div > .ff-square-comments-list').find('.vote').each(function(item) {
                        initVote($(this));
                    });


                }
            });
        }



        function initVote(btn)
        {
            btn.on('click', function(e) {

                e.stopImmediatePropagation();

                let item = jQuery(this);

                if (jQuery(this).parents('.ff-item').length) {
                    var type = 'item';
                    var item_id = jQuery(this).parents('.ff-item').attr('post-id');
                } else {
                    var type = 'comment';
                    var item_id = jQuery(this).parents('.ff-square-comment').attr('comment-id');
                }

                var vote = (jQuery(this).index() == 0 ? 1 : -1);


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

                        if (type == 'comment') {
                            console.log(item.siblings());
                            var cvote = parseInt(item.siblings('.vote-holder').html());
                            cvote+= vote;
                            // if (cvote > 0) { cvote = "+ " + cvote; }
                            item.siblings('.vote-holder').html(cvote);
                        }
                        if (type == 'item') {

                            var cvote = parseInt(item.siblings('.vote-holder').find('h6').html().replace(' ', ''));
                            cvote+= vote;
                            if (cvote > 0) { cvote = "+ " + cvote; }
                            item.siblings('.vote-holder').find('h6').html(cvote);
                        }
                    }

                });
                return false;
            });
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

                    $(response).each(function (key, item) {

                        if (key %2 == 0) {

                            let html = '<div class="ff-square-box-item">'
                            + '<p class="ff-square-box-item-post"><a href="#" data-id="' + item.post_id + '">' + item.post_header.substring(0, 40) + '...</a></span>'
                            + '<div><p class="ff-square-box-item-comment" data-item-id="' + item.comment.id + '">' + item.comment.substring(0, 40) + '...<span class="ff-square-box-item-time">' + prettyDate(item.created_at) + '</span></p></div>'
                            + '</div>';
                            $('.ff-square-box-items').eq(0).append(html);
                        }
                    });

                    $('.ff-square-box-item-post > a').on('click', function() {
                        jQuery('article[post-id="' + $(this).attr('data-id') + '"]').click();
                    });
                }
            });
        }

        function loadBlock2()
        {

            jQuery.ajax({
                type : "post",
                dataType : "json",
                url : ff_square_ajax.ajaxurl,
                data : {
                    action: "ffs_block_get",
                    block: 2,
                    after: $('.select-date').eq(0).val(),
                    nonce: ff_square_ajax.block_get_nonce,
                },
                success: function(response) {

                    $('.ff-square-box-items').eq(1).html('');

                    let votes = JSON.parse(response['votes']);

                    var block = [];

                    $(JSON.parse(response['posts'])).each(function (key, item) {

                        // if (key == votes.length) {
                        //     return false;
                        // }

                        let vote = votes[votes.findIndex(x => x.item_id === item.post_id)];

                        block.push([parseInt(vote.vote),'<div class="ff-square-box-item"><p class="ff-square-box-item-vote">'
                        + (vote.vote > 0 ? '+ ' + vote.vote : vote.vote) + ' stemmen op: ' + '<a href=#" data-id="' + item.post_id + '">' + item.post_header + '</a>'
                        +  '</p></div>']);

                    });

                    block.sort(function(a, b){
                        if(a[0]== b[0]) return 0;
                        return a[0]< b[0]? 1: -1;
                    }).map(function(a) {
                        a.shift();
                    });

                    $('.ff-square-box-items').eq(1).append(block.flat());

                }
            });
        }

        loadBlock1();

        $('.select-date').initialize(function() {
            if (init == 0) {
                loadBlock2();
                loadBlock3();
                init = 1;
            }

            $('.select-date').on('change', function() {
                if ($(this).index() == 1) {
                    loadBlock2();
                } else {
                    loadBlock3();
                }
            });
        });

        function loadBlock3()
        {
            jQuery.ajax({
                type : "post",
                dataType : "json",
                url : ff_square_ajax.ajaxurl,
                data : {
                    action: "ffs_block_get",
                    block: 3,
                    after: $('.select-date').eq(1).val(),
                    nonce: ff_square_ajax.block_get_nonce,
                },
                success: function(response) {

                    $('.ff-square-box-items').eq(2).html('');

                    let votes = JSON.parse(response['votes']);

                    var block = [];

                    $(JSON.parse(response['posts'])).each(function (key, item) {

                        // if (key == votes.length) {
                        //     return false;
                        // }

                        let vote = votes[votes.findIndex(x => x.item_id === item.post_id)];

                        block.push([parseInt(vote.vote), '<div class="ff-square-box-item"><p class="ff-square-box-item-vote">'
                        + (vote.vote > 0 ? '+ ' + vote.vote : vote.vote) + ' stemmen op: ' + '<a href=#" data-id="' + item.post_id + '">' + item.post_header + '</a>'
                        +  '</p></div>']);


                    });

                    block.sort(function(a, b){
                        if(a[0]== b[0]) return 0;
                        return a[0]> b[0]? 1: -1;
                    }).map(function(a) {
                        a.shift();
                    });

                    $('.ff-square-box-items').eq(2).append(block.flat());
                },
            });

            $('.ff-square-box-item-vote > a').on('click', function() {
                jQuery('article[post-id="' + $(this).attr('data-id') + '"]').click();
            });

        }

        $.initialize('.ff-item', function() {

            let html = '<div class="square-box"><div class="ff-item-bar" style="text-align:center; ">'
            + '<div class="ff-square-bar-item vote" style=" float:left;"><h6><i class="fas fa-plus-square"></i></h6></div>'
            + '<div class="ff-square-bar-item vote-holder"><h6></h6></div>'
            + '<div class="ff-square-bar-item vote" style=" float:right; "><h6><i class="fas fa-minus-square"></i></h6></div>'
            + '</div>'
            + '<div class="ff-item-bar" style="text-align:center; ">'
            + '<div class="ff-square-bar-item comments"><h6></h6></div>'
            + '<div class="ff-share-wrapper"><i class="ff-icon-share"></i><div class="ff-share-popup"><a href="http://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.instagram.com%2Fp%2FCG11rWbgOzp%2F" class="ff-fb-share" target="_blank" rel="noreferrer">Facebook</a><a href="https://twitter.com/share?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FCG11rWbgOzp%2F" class="ff-tw-share" target="_blank" rel="noreferrer">Twitter</a><a href="https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FCG11rWbgOzp%2F&amp;media=https%3A%2F%2Fscontent-muc2-1.cdninstagram.com%2Fv%2Ft51.29350-15%2F122586207_266242274816010_6979763166844425091_n.jpg%3F_nc_cat%3D107%26ccb%3D2%26_nc_sid%3D8ae9d6%26_nc_ohc%3DBIkLmwUUaU4AX_-3mve%26_nc_ht%3Dscontent-muc2-1.cdninstagram.com%26oh%3D1f3e0d8d9b0dd6e71540fc38f11438e8%26oe%3D5FBDC27A" class="ff-pin-share" target="_blank" rel="noreferrer">Pinterest</a><a href="https://www.linkedin.com/cws/share?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FCG11rWbgOzp%2F" class="ff-li-share" target="_blank" rel="noreferrer">Linkedin</a><a href="mailto:?subject=&amp;body=https%3A%2F%2Fwww.instagram.com%2Fp%2FCG11rWbgOzp%2F" class="ff-email-share">Email</a></div></div>'
            + '</div></div>';

            observer.observe($(this)[0], {
                attributes: true
            });

            $(this).find('.picture-item__inner').append(html);
        });

        $.initialize('.ff-slideshow-media > li', function() {

            let html = '<div class="ff-square-comments-list"></div>'
            + '<div class="ff-square-commentbox">'
            + '<h3>Reageren</h3>';

            if (ff_square_ajax.loggedin) {
                html+= '<textarea class="ff-square-commentbox-textarea" placeholder="Reactie..." required/>'
                + '<button class="ff-square-commentbox-button">Reactie plaatsen</button>'
                + '</div>';
            } else {
                html+= '<p>Het e-mailadres wordt niet gepubliceerd</p>'
                + '<textarea class="ff-square-commentbox-textarea" placeholder="Reactie..." required/>'
                + '<input type="text" name="name" placeholder="Naam" required/>'
                + '<input type="email" name="email" placeholder="Email" required/>'
                + '<input type="text" name="website" placeholder="Website" required/>'
                + '<label class="ff-square-label"><input type="checkbox" name="remember" placeholder="Website" required/>Mijn naam, email opslaan</label>'
                + '<button class="ff-square-commentbox-button">Reactie plaatsen</button>'
                + '</div>';
            }

            $(this).find('.ff-comments-list').append(html);

            if ($(this).index() == (ffitems - 1)) {

                $(".ff-square-commentbox-button").click( function(e) {

                    e.preventDefault();
                    let card = jQuery(this);

                    jQuery.ajax({
                        type : "post",
                        dataType : "json",
                        url : ff_square_ajax.ajaxurl,
                        data : {
                            action: "ffs_comment_create",
                            post_id : card.parents('li').attr('post-id'),
                            comment : card.siblings('textarea').val(),
                            name: card.siblings('input[name="name"]').val(),
                            website: card.siblings('input[name="website"]').val(),
                            email: card.siblings('input[name="email"]').val(),
                            remember: card.siblings('input[name="remember"]').val(),
                            nonce: ff_square_ajax.comment_create_nonce,
                        },
                        success: function(response) {

                            if (response == -1) {
                                jQuery('.ff-square-commentbox').html('Er bestaat al een account met dit emailadres. Log in op het account om een bericht te plaatsen.');
                                return false;
                            }

                            if (response == 0) {
                                jQuery('.ff-square-commentbox').html('We hebben uw een mail gestuurd. Verifieer uw email om het bericht te plaatsen.');
                                return false;
                            }

                            let html = '<div class="ff-square-comment" comment-id="' + response.id + '">'
                            + '<span style="display:inline-block;"class="vote"><i class="fas fa-plus-square"></i></span>'
                            + '<span style="display:inline-block; font-weight: 600;" class="vote-holder">0</span>'
                            + '<span style="display:inline-block;" class="vote"><i class="fas fa-minus-square"></i></span>'
                            + '<b>' + response.name + '</b></a><span>' + response.comment + '</span>'
                            + '</div>';
                            card.parents('li').find('.ff-square-comments-list').append(html);


                            initVote();
                        }
                    })

                });
            }
        });

    })( jQuery );
