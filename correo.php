<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
//$link = mysqli_connect("localhost", "emgagenc_lmdlc", ";e9*(M0KP3jy", "emgagenc_losmdlc");
function set_Motivo($motivo) {
    $selected = "";
    switch($motivo) {
        case "1": 
            $selected = utf8_decode("Cumpleaños");
        break;
        case "2": 
            $selected = "Saludo Personalizado";
        break;
    }
    return $selected;
}
function validateForm($name, $email, $motivo, $message) {
    $returnErrors = [];
    $nameLength = strlen($name);
    $emailLength = strlen($email);
    $motivoLength = strlen($motivo);
    $messageLength = strlen($message);
    $errors = 0;
    $returnErrors[] = array(
        "error" => "Se encontraron errores en el formulario.");
    //Nombre
    if($name == "" || $nameLength > 0 && $nameLength < 5 ) {
        $errors++;
    }
    else if($nameLength > 100) {
        $errors++;
    }
    
    //Motivo
    if($motivo == "" || $motivoLength == 0) {
        $errors++;
    }
    if($motivo !== "1" &&  $motivo !== "2") {
        $errors++;
    }


    //Mensaje
    if($message == "" || $messageLength == 0) {
        $errors++;
    }
    else if($messageLength > 2000) {
        $errors++;
    }
    //Email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors++;
    }
    if($email == "" || $emailLength == 0) {
        $errors++;
    }
    else if($emailLength > 500) {
        $errors++;
    }
    if($errors > 0) {
        echo json_encode($returnErrors);
        exit;
    } 
}

$link = mysqli_connect("localhost", "root", "Admin123", "emgagenc_losmdlc");
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}
$geoPluginarray = unserialize( file_get_contents('http://www.geoplugin.net/php.gp?ip=' . $ip));
$paisdata = $geoPluginarray['geoplugin_countryName'];
$curso = "Saludo de los meniques"; 
// $select = $_POST['select'];
// $name = mysqli_real_escape_string($link, $_POST['name']);
// $email = mysqli_real_escape_string($link, $_POST['email']);
// $messageid = mysqli_real_escape_string($link, $_POST['messageid']);
// $motivoText = set_Motivo($messageid);
// $message = mysqli_real_escape_string($link, $_POST['message']);
// $pais = mysqli_real_escape_string($link, $paisdata);

$name = $_POST['name'];
$email = $_POST['email'];
$messageid = $_POST['messageid'];
$motivoText = set_Motivo($messageid);
$message = $_POST['message'];
$pais = mysqli_real_escape_string($link, $paisdata);
validateForm($name, $email, $messageid, $message);

// Attempt insert query execution
// $sql = "INSERT INTO cliente (name, email, pais, messageid, message) VALUES ('$name', '$email', '$pais', '$messageid', '$message')";
$sql = "INSERT INTO cliente (name, email, pais, messageid, message) VALUES (?, ?, ?, ?, ?)";
$stmt = $link->prepare($sql);
$stmt->bind_param("sssss", $name, $email, $pais, $motivoText, $message);
if($stmt->execute()) {
    // echo "Success";
    $destinatario = "losmeniquesdelacasa@gmail.com";
    $asunto = "$curso";
    $carta = "Nombre: $name \n";
    $carta .= "Correo: $email \n";
    $carta .= "Motivo: $motivoText \n";
    $carta .= "Mensaje: $message \n";
    $carta .= "Ubicacion: $paisdata";
    $success[] = array(
        "success" => "success");
        echo json_encode($success);
// mail($destinatario, $asunto, $carta);
// echo "CORREO ENVIADO";
//header('location:https://losmeniquesdelacasa.com');
     exit();
} else {
    $returnErrors[] = array(
    "error" => "ERROR: Could not able to execute $sql. '".mysqli_error($link)."'" );
    echo json_encode($returnErrors);
    exit;
    // echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}

//Close connection
mysqli_close($link);

?>