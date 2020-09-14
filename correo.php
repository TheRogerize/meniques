<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
//$link = mysqli_connect("localhost", "emgagenc_lmdlc", ";e9*(M0KP3jy", "emgagenc_losmdlc");
$link = mysqli_connect("localhost", "root", "Admin123", "emgagenc_losmdlc");
//  echo "entrando";
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
$name = mysqli_real_escape_string($link, $_POST['name']);
$email = mysqli_real_escape_string($link, $_POST['email']);
$messageid = mysqli_real_escape_string($link, $_POST['messageid']);
$message = mysqli_real_escape_string($link, $_POST['message']);
$pais = mysqli_real_escape_string($link, $paisdata);
// var_dump($name);
// var_dump($email);
// var_dump($message);
// var_dump($messageid);

// Attempt insert query execution
// $sql = "INSERT INTO cliente (name, email, pais, messageid, message) VALUES ('$name', '$email', '$pais', '$messageid', '$message')";
$sql = "INSERT INTO cliente (name, email, pais, messageid, message) VALUES (?, ?, ?, ?, ?)";
$stmt = $link->prepare($sql);
$stmt->bind_param("sssss", $name, $email, $pais, $messageid, $message);
if($stmt->execute()) {
    echo "Success";
    $destinatario = "losmeniquesdelacasa@gmail.com";
    $asunto = "$curso";
    $carta = "Nombre: $name \n";
    $carta .= "Correo: $email \n";
    $carta .= "Motivo: $messageid \n";
    $carta .= "Mensaje: $message \n";
    $carta .= "Ubicacion: $paisdata";

// mail($destinatario, $asunto, $carta);
echo "CORREO ENVIADO";
//header('location:https://losmeniquesdelacasa.com');
     exit();
} else {
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}

//Close connection
mysqli_close($link);

?>