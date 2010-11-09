$(function() {
    initAudio();
});

function initAudio() {

    var player = '<p class="player">\
									  <span id="playtoggle" />\
									  <span id="gutter">\
									    <span id="loading" />\
									    <span id="handle" class="ui-slider-handle" />\
									  </span>\
									  <span id="timeleft" />\
									  <audio>\
									    <source src="./audio/horse.ogg" type="audio/ogg"></source>\
										</audio>\
									</p>';

    $(player).insertAfter("#listen .player_title");

    audio = $('.player audio').get(0);
    loadingIndicator = $('.player #loading');
    positionIndicator = $('.player #handle');
    timeleft = $('.player #timeleft');

    if ((audio.buffered != undefined) && (audio.buffered.length != 0)) {
        $(audio).bind('progress', function() {
            var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
            loadingIndicator.css({width: loaded + '%'});
        });
    }
    else {
        loadingIndicator.remove();
    }

    $(audio).bind('timeupdate', function() {

        var rem = parseInt(audio.duration - audio.currentTime, 10),
                pos = (audio.currentTime / audio.duration) * 100,
                mins = Math.floor(rem / 60, 10),
                secs = rem - mins * 60;

        timeleft.text('-' + mins + ':' + (secs < 10 ? '0' + secs : secs));
        if (pos > 100) pos = 100;
        if (pos < 0) pos = 0;
        if (!manualSeek) {
            positionIndicator.css({left: pos + '%'});
        }
        if (!loaded) {
            loaded = true;

            $('.player #gutter').slider({
                value: 0,
                step: 0.01,
                orientation: "horizontal",
                range: "min",
                max: audio.duration,
                animate: true,
                slide: function() {
                    manualSeek = true;
                },
                stop:function(e, ui) {
                    manualSeek = false;
                    audio.currentTime = ui.value;
                }
            });
        }

    }).bind('play', function() {
        $("#playtoggle").addClass('playing');
    }).bind('pause ended', function() {
        $("#playtoggle").removeClass('playing');
    });

    $("#playtoggle").click(function() {
        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }
    });

}