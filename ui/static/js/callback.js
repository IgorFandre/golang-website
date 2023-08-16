jQuery(document).ready(function($) {

    // Добавляем маски для полей
    $('#phone').mask('+7 (999) 999-99-99');
    $("#email").inputmask("email")

    // Проверяет отмечен ли чекбокс согласия
    // с обработкой персональных данных
    $('#e-check').on('click', function() {
        if ($("#e-check").prop("checked")) {
            $('#e-button').attr('disabled', false);
        } else {
            $('#e-button').attr('disabled', true);
        }
    });
    $('#ph-check').on('click', function() {
        if ($("#ph-check").prop("checked")) {
            $('#ph-button').attr('disabled', false);
        } else {
            $('#ph-button').attr('disabled', true);
        }
    });

    // Отправляет данные из формы на сервер и получает ответ
    $('#e-contactForm').on('submit', function(event) {

        event.preventDefault();

        var form = $('#e-contactForm'),
            button = $('#e-button'),
            answer = $('#e-answer'),
            loader = $('#e-loader');

        var e_sender_data = new Object();
        e_sender_data.name = $('#e-name').val();
        e_sender_data.contact  = $('#email').val();
        e_sender_data.message = $('#e-message').val();

        $.ajax({
            url: '/send/request',
            type: 'POST',
            dataType: "html",
            data: JSON.stringify(e_sender_data),
            beforeSend: function() {
                answer.empty();
                button.attr('disabled', true).css('margin-bottom', '20px');
                loader.fadeIn();
            },
            success: function(result) {
                loader.fadeOut(300, function() {
                    answer.text(result);
                });
                form.find('.form-control').val('');
                button.attr('disabled', false);
            },
            error: function() {
                loader.fadeOut(300, function () {
                    answer.text('Произошла ошибка! Попробуйте позже.');
                });
                button.attr('disabled', false);
            }
        });
    });

    $('#ph-contactForm').on('submit', function(event) {

        event.preventDefault();

        var form = $('#ph-contactForm'),
            button = $('#ph-button'),
            answer = $('#ph-answer'),
            loader = $('#ph-loader');

        var ph_sender_data = new Object();
        ph_sender_data.name = $('#ph-name').val();
        ph_sender_data.contact  = $('#phone').val();
        ph_sender_data.message = $('#ph-message').val();

        $.ajax({
            url: '/send/request',
            type: 'POST',
            dataType: "html",
            data: JSON.stringify(ph_sender_data),
            beforeSend: function() {
                answer.empty();
                button.attr('disabled', true).css('margin-bottom', '20px');
                loader.fadeIn();
            },
            success: function(result) {
                loader.fadeOut(300, function() {
                    answer.text(result);
                });
                form.find('.form-control').val('');
                button.attr('disabled', false);
            },
            error: function() {
                loader.fadeOut(300, function () {
                    answer.text('Произошла ошибка! Попробуйте позже.');
                });
                button.attr('disabled', false);
            }
        });
    });
});