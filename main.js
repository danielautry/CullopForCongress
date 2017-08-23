(function(){
    var bools = [false];

    $(window).scroll(function() {
         // console.log($(window).scrollTop());
        
        var offsetPoint1 = 100;
        

        if ($(window).scrollTop() >= offsetPoint1 && bools[0] != true) {
            bools[0] = true;
            $('p').css('visibility', 'visible').hide().fadeIn(1100);
            $(this).off('scroll');
        }
    });
})();

$('.contact_form').submit(function () {
    var formData = $('.contact_form').serializeArray();
    var errors = validateForm(formData);

    if (errors[0] != "") {
        console.log("errors found");
        $('.form_errors').html(errors[0]);
        return false;
    }

    console.log("no errors, posting");

    $.post("send_form_email.php", formData);
    triggerMessageSent();

    return false;
});

function validateForm(data) {

    var numValues = 0;
    for (var i=0; i<data.length; i++){
        if (data[i]['value'] != "") numValues++;
    }

    if (numValues < 3) {
        return ["Name, Email, and Phone Number are required fields"];
    }

    var validName = validateName(escapeHTML(data[0]['value']));
    var validPhone = validatePhone(escapeHTML(data[1]['value']));
    var validEmail = validateEmail(escapeHTML(data[2]['value']));
    
    // if (numValues == 3){
    //     if (data[2]['value'] != "") {
    //         return ["Message field is required"];
    //     } else {
    //         message = escapeHTML(data[2]['value']);
    //         validPhone = "";
    //     }
    // } else {
    //     validPhone = validatePhone(escapeHTML(data[2]['value']));
    //     message = escapeHTML(data[3]['value']);
    // }

    var errors = [];
    var errorMessage = "";

    if (!validName) errorMessage += 'Valid name required\n<br>';
    if (!validEmail) errorMessage += 'Valid email required\n<br>';
    if (!validPhone && validPhone != "") errorMessage += 'Valid phone required';

    console.log("errorMessage", errorMessage);

    errors.push(errorMessage);
    console.log("errors", errors);

    return errors;
}

function validateName(name) {
    return /^[A-Za-z .'-]+$/.test(name);
}

function validateEmail(email) {
    return /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
}

function validatePhone(phone) {
    return /[^a-zA-Z.]/.test(phone);
}

function escapeHTML(text) {

    text.trim();

    var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function triggerMessageSent() {
    $('.contact-all').fadeOut(500, function() {
        $('.contact-all').css('display', 'none');
        // $('.sent-social1').css('display', 'none');
        $('.message-sent').fadeIn(1000).css('display', "block");
    });
}

function scrollToAbout() {
    $('html, body').animate({ scrollTop: $('.about').offset().top }, 1200);
    return false;
}

function scrollToContact() {
    $('html, body').animate({ scrollTop: $('.get-involved-container').offset().top }, 1500);
    return false;
}

function scrollTop() {
    $('html, body').animate({ scrollTop: $('.top').offset().top }, 1500);
    return false;
}

var loadCount = 0;

function openFirstTime() {
    // if (loadCount < 1) {
    //     $('#video-box').css('display', 'inline');
    //     $('#video').attr('src', 'https://www.youtube.com/embed/jpd5ROfR620?autoplay=1');
    // } else {
    //     $('#video-box').css('display', 'none');
    //     $('#video').attr('src', ''); 
    // }
    // loadCount++;
    var visited = localStorage['visited'];
    if (!visited) {
       openVideo();
       localStorage['visited'] = true;
    }

}

function openVideo() {

    $('#video-box').css('display', 'inline');
    $('#video').attr('src', 'https://www.youtube.com/embed/wn3jMtToo3Y?autoplay=1');
}

function closeVideo() {
    $('#video-box').css('display', 'none');
    $('#video').attr('src', '');

}

function redirectNY() {
    window.location = 'https://act.myngp.com/Forms/-3743819434316395776';
}

function redirectBos() {
    window.location = 'https://act.myngp.com/Forms/2813703098111757056';
}

function redirectAtl() {
    window.location = 'https://act.myngp.com/Forms/2957818286187612928';
}

