!function() {
    const width_footer = $(window).width();
    var s_2 = document.createElement("script");
    s_2.type = "text/javascript";
    s_2.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Adb4e070839264a2f296bfac4b47eadec21fbf34448ca636ab2cf85319de240e6&amp;width=" + width_footer + "&amp;height" + width_footer + "&amp;lang=ru_RU&amp;scroll=true";
    document.getElementById("footer-map").innerHTML = "";
    document.getElementById("footer-map").appendChild(s_2);
}();