!function() {
    const height = $(window).height();
    const width = $(window).width();
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Adb4e070839264a2f296bfac4b47eadec21fbf34448ca636ab2cf85319de240e6&amp;width=" + width + "&amp;height=" + height + "&amp;lang=ru_RU&amp;scroll=true";
    document.getElementById("map").innerHTML = "";
    document.getElementById("map").appendChild(s);
}();