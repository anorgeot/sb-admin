// $(function() {
//
//     $('#side-menu').metisMenu();
//
// });
//
// //Loads the correct sidebar on window load,
// //collapses the sidebar on window resize.
// // Sets the min-height of #page-wrapper to window size
// $(function() {
//     $(window).bind("load resize", function() {
//         topOffset = 50;
//         width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
//         if (width < 768) {
//             $('div.navbar-collapse').addClass('collapse');
//             topOffset = 100; // 2-row-menu
//         } else {
//             $('div.navbar-collapse').removeClass('collapse');
//         }
//
//         height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
//         height = height - topOffset;
//         if (height < 1) height = 1;
//         if (height > topOffset) {
//             $("#page-wrapper").css("min-height", (height) + "px");
//             console.log("Page wrapper resized to: "+height+"px");
//         }
//
//
//         var element = $("h1.page-header").parent().parent().next().children().filter(":first");
//         var colWidth = element.width()/(parseInt(element.attr("large"))+1.15) - 30;
//         console.info( "Column width: "+colWidth );
//         var min = 28;
//         var mid = 3.5;
//         var max = 80;
//         var size = colWidth / mid;
//
//         //if (size < min) size = min;
//         if (size > max) size = max;
//
//         $(".stats-box .fa-5x").css('font-size', size + 'px');
//         $(".stats-box .huge").css('font-size', size/2.2 + 'px');
//
//
//
//
//
//     });
//
//     var url = window.location;
//     var element = $('ul.nav a').filter(function() {
//         return this.href == url || url.href.indexOf(this.href) == 0;
//     }).addClass('active').parent().parent().addClass('in').parent();
//     if (element.is('li')) {
//         element.addClass('active');
//     }
// });
