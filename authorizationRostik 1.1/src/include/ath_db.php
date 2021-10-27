<?php
$info = array(
    hostname => 'localhost',
    username => 'root',
    password => '',
    database => 'ath_db'
);


 $connection = mysqli_connect($info['hostname'], $info['username'], $info['password'], $info['database']);

 if (!$connection) {
     die("Произошла ошибка");
     mysqli_connect_error();
 }
 session_start();