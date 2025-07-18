(function ($) {
    $.spapp = function (options) {
      // set config and routes
      var config,
        routes = {};
  
      config = $.extend(
        {
          defaultView  : $("main#spapp > section:last-child").attr("id"),
          templateDir: "views/",
          pageNotFound: false,
        },
        options
      );
  
      $("main#spapp > section").each(function (k, e) {
        var elm = $(this);
        routes[elm.attr("id")] = {
          view: elm.attr("id"),
          load: elm.data("load"),
          onCreate: function () {},
          onReady: function () {},
        };
      });
      // update rotues programatically
      this.route = function (options) {
        $.extend(routes[options.view], options);
      };
  
      // manage hash change
      var routeChange = function () {
        var fullHash = location.hash.slice(1);
        
        // ==========================================================
        // === PERBAIKAN UTAMA DI SINI ===
        // Ambil hanya bagian pertama dari hash sebagai ID view
        var id = fullHash.split('/')[0];
        // ==========================================================

        var route = routes[id];
        var elm = $("#" + id);
  
        if (!elm.length || !route) {
          if (config.pageNotFound) {
            window.location.hash = config.pageNotFound;
            return;
          }
          console.log(id + " not defined");
          return;
        }

        $("main#spapp > section").hide();
        elm.show();

        if (elm.hasClass("spapp-created")) {
          route.onReady();
        } else {
          elm.addClass("spapp-created");
          if (!route.load) {
            route.onCreate();
            route.onReady();
          } else {
            elm.load(config.templateDir + route.load, function () {
              route.onCreate();
              route.onReady();
            });
          }
        }
      };
  
      // and run
      this.run = function () {
        window.addEventListener("hashchange", function () {
          routeChange();
        });
        if (!window.location.hash) {
          window.location.hash = config.defaultView;
        } else {
          routeChange();
        }
      };
  
      return this;
    };
})(jQuery);
