let errors = 0;
$(document).ready(function () {
    function validateEmail(email) {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
        return expression.test(String(email).toLowerCase())
    }
    //Nombre
    const inputNombre = $("#name");
    const inputCorreo = $("#email");
    const inputMotivo = $("#messageid");
    const inputMensaje = $("#message");

    function validate(dato, tipo) {

        switch (tipo) {
            case "nombre":
                if (dato == "") {
                    $("div.nombreError").fadeIn(300);
                    $("div.nombreError").text("Debes ingresar un nombre y apellido.");
                    $(inputNombre).addClass("invalid");
                    errors++;
                    break;
                }
                else if (dato.length > 0 && dato.length < 5) {
                    $("div.nombreError").fadeIn(300);
                    $("div.nombreError").text("Por favor ingresa tu nombre completo.");
                    $(inputNombre).addClass("invalid");
                    errors++;
                    break;
                }
                else if (dato.length > 100) {
                    $("div.nombreError").fadeIn(300);
                    $("div.nombreError").text("El nombre ingresado es demasiado extenso.");
                    $(inputNombre).addClass("invalid");
                    errors++;
                    break;
                }
                else if (dato.length > 0 && dato.length < 100 && dato !== "") {
                    $("div.nombreError").fadeOut(300);
                    $("div.nombreError").text("");
                    $(inputNombre).removeClass("invalid");
                    break;
                }
                break;

            //Correo
            case "email":
                if (dato == "") {
                    $("div.emailError").fadeIn(300);
                    $("div.emailError").text("Por favor, ingresa tu correo electrónico.");
                    $(inputCorreo).addClass("invalid");
                    errors++;
                    break;
                }
                else if (!validateEmail(dato)) {
                    $("div.emailError").fadeIn(300);
                    $("div.emailError").text("Debes ingresar un correo electrónico válido.");
                    $(inputCorreo).addClass("invalid");
                    errors++;
                    break;
                }
                else if (dato.length > 500) {
                    $("div.emailError").fadeIn(300);
                    $("div.emailError").text("El correo electrónico ingresado es demasiado extenso.");
                    $(inputCorreo).addClass("invalid");
                    errors++;
                    break;
                }
                else if (dato.length > 0 && dato.length < 500 && validateEmail(dato)) {
                    $("div.emailError").fadeOut(300);
                    $("div.emailError").text("");
                    $(inputCorreo).removeClass("invalid");
                    break;
                }
                break;
            case "motivo":
                if (dato == "" || dato == "0") {
                    $("div.motivoError").fadeIn(300);
                    $("div.motivoError").text("Debes seleccionar un motivo.");
                    $(inputMotivo).addClass("invalid");
                    errors++;
                    break;
                }
                else if (dato == '1' || dato == '2') {
                    $("div.motivoError").fadeOut(300);
                    $("div.motivoError").text("");
                    $(inputMotivo).removeClass("invalid");
                    break;
                }
                break;
            case "mensaje":
                if (dato == "" || dato.length == 0) {
                    $("div.mensajeError").fadeIn(300);
                    $("div.mensajeError").text("Debes ingresar tu mensaje.");
                    $(inputMensaje).addClass("invalid");
                    errors++;
                    break;
                }
                else if (dato.length > 2000) {
                    $("div.mensajeError").fadeIn(300);
                    $("div.mensajeError").text("El mensaje ingresado es demasiado extenso.");
                    $(inputMensaje).addClass("invalid");
                    errors++;
                    break;
                }
                else if (dato.length > 0 && dato.length < 2000 && dato !== "") {
                    $("div.mensajeError").fadeOut(300);
                    $("div.mensajeError").text("");
                    $(inputMensaje).removeClass("invalid");
                    break;
                }
                break;
        }
    }
    function validateForm(nombre, motivo, email, mensaje) {
        errors = 0;
        validate(nombre, 'nombre');
        validate(email, 'email');
        validate(motivo, 'motivo');
        validate(mensaje, 'mensaje');
        return errors;
    }
    function cleanForm() {
        $(inputCorreo).val("");
        $(inputNombre).val("");
        $(inputMotivo).val("");
        $(inputMotivo).prop('selectedIndex', 0);
        $(inputMensaje).val("");
    }
    $("#form-submit").on('click', function (e) {

        const nombre = $("#name").val();
        const motivo = $("select#messageid").children("option:selected").val();
        const email = $("#email").val();
        const mensaje = $("#message").val();
        const arrayy = [nombre, motivo, email, mensaje];
        console.log(arrayy);
        //TEMPORAL PARA PRUEBAS DE BACK
        validateForm(nombre, motivo, email, mensaje);
        if (errors == 0) {
            const formData = {
                name: nombre,
                email,
                messageid: motivo,
                message: mensaje
            }
            console.log(formData);
            e.preventDefault();
            $.ajax({
                type: "POST",
                crossDomain: true,
                async: true,
                url: 'correo.php',
                data: formData,
                dataType: 'json',
                success: function (result) {
                    if (result[0].error) {
                        console.log(result[0].error);
                        $("#errorMsg").fadeIn(300);
                        $("#errorMsg").text(result[0].error);
                    }
                    if (result[0].success) {
                        console.log(result[0].success);
                        $("#errorMsg").fadeOut(0);
                        $("#submitButton").fadeOut(0);
                        $("#successMsg").fadeIn(300);
                        cleanForm();
                    }
                    // see attached image how to get the path for object
                },
                error: function (result) {
                    alert("Ocurrió un error con el servidor, intente más tarde");
                }
            });
        }
        // else {
        //     alert("Se encontraron errores")
        // }
    });
});