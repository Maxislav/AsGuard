function send() {
    $('#loader').show();
    var text = $("#commentTextEmail").val();
    var checked_alpha = $('#alpha_sms').attr('checked');
    var checked_kyivstar = $('#kyivstar_sms').attr('checked');
    var checked_email = $('#email').attr('checked');
    var checked_motokiev = $('#motokiev:checked').length == 1 ? 'checked': null;
    var s = $.ajax({

        type: 'POST',
        dataType: 'json',
        data: {
            selectIdDtp: selectIdDtp,
            text: text,
            alpha: checked_alpha,
            kyivstar: checked_kyivstar,
            email: checked_email,
            motokiev: checked_motokiev
        },
        url: 'alpha/alpha.php',
       // url: 'alpha/repost.php',
        async: false,
        success: function (data) {
            $('#loader').hide();
            //alert(data.msg);
            alert(data);

        },
        fail: function (data) {
            $('#loader').hide();
            alert(data.msg);
        }

    }).responseText;
    $('#loader').hide();
    alert(s);


}