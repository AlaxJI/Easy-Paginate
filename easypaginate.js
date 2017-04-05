/*
 * 	Easy Paginate 1.0b - jQuery plugin
 * 	Updated by Alexei Dubrovski 2017-04-05
 * 	
 * 	based on
 * 	
 * 	Easy Paginate 1.0 - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/
 *	
 *	
 *
 *	Copyright (c) 2011 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt
) *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

(function ($) {

    $.fn.easyPaginate = function (method) {

            var defaults,options;
            var step;
            var lower, upper;
            var children;
            var count;
            var obj, next, prev;
            var pages;
            var page;
            var timeout;
            var clicked;

            function show() {
                clearTimeout(timeout);
                lower = ((page - 1) * step);
                upper = lower + step;
                $(children).each(function (i) {
                    var child = $(this);
                    child.hide();
                    if (i >= lower && i < upper) {
                        setTimeout(function () {
                            child.fadeIn('fast')
                        }, (i - (Math.floor(i / step) * step)) * options.delay);
                    }
                    if (options.nextprev) {
                        if (upper >= count) {
                            if (options.hidenextprev)
                                next.fadeOut('fast');
                        } else {
                                next.fadeIn('fast');
                        }
                        ;
                        if (lower >= 1) {
                                prev.fadeIn('fast');
                        } else {
                            if (options.hidenextprev)
                                prev.fadeOut('fast');
                        }
                        ;
                    }
                    ;
                });
                $('li', '#' + options.paginationId).removeClass(options.current);
                $('li[data-index="' + page + '"]', '#' + options.paginationId).addClass(options.current);

                if (options.auto) {
                    if (options.clickstop && clicked) {
                    } else {
                        timeout = setTimeout(auto, options.pause);
                    };
                };
            };

            function auto() {
                if (options.loop)
                    if (upper >= count) {
                        page = 0;
                        show();
                    }
                if (upper < count) {
                    page++;
                    show();
                }
            };
            
            function setPagination(that){
                
                if (!options.controls) return;
                
                obj = that;

                if (count > step) {

                    if ((count / step) > pages)
                        pages++;

                    var ol = $('<ol id="' + options.paginationId + '"></ol>').insertAfter(obj);

                    if (options.nextprev) {
                        prev = $('<li class="prev">Назад</li>')
                                .appendTo(ol)
                                .click(function () {
                                    clicked = true;
                                    page--;
                                    if (page == 0){
                                        if (options.loop){
                                          page = pages;  
                                        } else {
                                        page = 1;
                                        }
                                    }
                                    show();
                                });
                                if (options.hidenextprev) prev.hide();
                    };

                    if (options.numeric) {
                        console.log('create pages '+pages);
                        for (var i = 1; i <= pages; i++) {
                            $('<li data-index="' + i + '">' + i + '</li>')
                                    .appendTo(ol)
                                    .click(function () {
                                        clicked = true;
                                        page = $(this).attr('data-index');
                                        show();
                                    });
                        };
                    };

                    if (options.nextprev) {
                        next = $('<li class="next">Дальше</li>')
                                .appendTo(ol)
                                .click(function () {
                                    clicked = true;
                                    page++;
                                    if (page > pages){
                                        if (options.loop){
                                          page = 1;  
                                        } else {
                                        page = pages;
                                        }
                                    }
                                    show();
                                });
                                if (options.hidenextprev) next.hide();
                    };
                }
            }
            
            function delPagination(that){
                $('#' + that +' + #' + options.paginationId).remove();
            }
    var methods = {
        init: function (settings) {
            defaults = {
                step: 4,
                delay: 100,
                numeric: true,
                nextprev: true,
                hidenextprev:false,
                auto: false,
                loop: false,
                pause: 4000,
                clickstop: true,
                paginationId: 'pagination',
                current: 'current',
                randomstart: false,
                nexttext:'Далее',
                prevtext:'Назад',
                controls:true
            };

            options = $.extend(defaults, settings);
            if (options.controls === false){
                options.nextprev = false;
            }
            step = options.step;
            children = $(this).children();
            count = children.length;
            console.log(pages);
            pages = Math.floor(count/step);
            page = (options.randomstart) ? Math.floor(Math.random() * pages) + 1 : 1;
            clicked = false;            

            return this.each(function () {

                setPagination(this);
                show();
                
            });
        },
        update: function (settings){
            options = $.extend(defaults, settings);
            clearTimeout(timeout);
            step = options.step;
            children = $(this).children();
            count = children.length;
            pages = Math.floor(count/step);
            page = (options.randomstart) ? Math.floor(Math.random() * pages) + 1 : 1;
            clicked = false;            
            

            return this.each(function () {
                delPagination($(this).attr('id'));
                setPagination(this);
                show();
                
            });
            
            
        },
        destroy: function (){
            clearTimeout(timeout);
            return this.each(function () {
                delPagination($(this).attr('id'));
            });
        }
    };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.tooltip');
        }

    };

})(jQuery);
