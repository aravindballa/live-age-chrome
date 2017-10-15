

$( document ).ready(function() {
    $( '#dialog' ).dialog({ 
        'autoOpen': false,
        'show': 'blind',
        'hide': 'blind'
    });
    updater();
    $("#change-age").click(function(){
        console.log($('#bday').val());
        chrome.storage.sync.set({'bday': $('#bday').val()});
        $('#dialog').dialog( 'close' );
    });

    $('#d-change-age').click(function(){
        $('#dialog').dialog( 'open' );
    })
});

var updater = function() {
    setInterval(function(){
        chrome.storage.sync.get("bday", function(items){
            if( items.bday) {
                var bday = new Date(items.bday);
                var today = new Date();
                var age = parseFloat((today.getTime()-bday.getTime())/31536000000);
                //console.log(age);
                $("#age").html(age.toString().substring(0,15));
                $("#age").slideDown(100);
            }
            else
                updater();
        });
    }, 100);
}



