$( document ).ready(function() {
    
    // Pre-game
    $('#connected').hide();
    $('#notconnected').show();
    $("#game").hide();
    
    /*
    window.onmessage = function(e){
        if (e.data == "done") {
            levels += 1;
            $("#levels").text(levels);
        }
        else {
            score += parseInt(e.data);
            $("#score").text(score);
        }
    };
    */
    $("#playButton").click(function() {
        $("#landing").hide();
        $("#game").show();
        gameStart();
        //$('#gameWindow').attr('src', "game1.html");
    });
    
    /*
    setInterval(function(){ 
        $.ajax({
            url: "http://www.google.com/",
            timeout: 10000,
            error: function(jqXHR) { 
                if(jqXHR.status==0) {
                    $('#connected').hide();
                    $('#notconnected').show();
                }
            },
            success: function() {
                $('#connected').show();
                $('#notconnected').hide();
            }
        });   
    }, 1000);*/
});
