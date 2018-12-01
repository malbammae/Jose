<?php

//CONEXION DB//
DEFINE('DB_USERNAME', 'root');
DEFINE('DB_PASSWORD', 'root');
DEFINE('DB_HOST', 'localhost');
DEFINE('DB_DATABASE', 'botix_db');

$con = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

if (mysqli_connect_error()) {
	die('Connect Error ('.mysqli_connect_errno().') '.mysqli_connect_error());
}

//Insert direccion
$insert_dir = mysqli_query($con, "INSERT INTO DIRECCION (comuna,calle,region)
VALUES ('$_POST[comuna]','$_POST[calle]','$_POST[region]')");

$resultado = mysqli_num_rows($con, "SELECT count(rut) FROM USUARIOS WHERE rut = '$_POST[rut]';");

if ($resultado == 0) {

	$query = mysqli_num_rows($resultado);

	if ($query == 0) {

		//insert registro
		$sql = "INSERT INTO USUARIOS (rut,nombre,email,DIRECCION_id,telefono,psw)
			VALUES ('$_POST[rut]','$_POST[name]','$_POST[email]',(SELECT MAX(id) FROM DIRECCION),'$_POST[telefono]','$_POST[psw]')";

		$insert_usuario = mysqli_query($con, $sql);

		if ($insert_usuario == 1) {
			echo "Usuario ingresado de manera exitosa...";

		} else {
			echo "Fallo, Rut ya existe en nuestros registros...";
		}
	}

} else {
	echo "El usuario ya existe";
}
//Cierre de conexion DB
mysqli_close($con);

?>

<html>
<head>
<!-- redirecciona en segundos seteados -->
<meta http-equiv="refresh" content="5;url=index.html">
<p>Serás re-direccionado en unos instantes...</p>
</head>
</html>