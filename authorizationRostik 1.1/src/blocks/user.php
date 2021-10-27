<?php
    require_once '../include/ath_db.php';

    if (!isset($_SESSION['login'])) {
        header('Location: http://localhost');
    }
    if (isset($_POST['log_off'])) {
        session_destroy();
        header('Location: http://localhost');
    }
?>

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../css/style.css">
    <title>Document</title>
</head>
<body>
    <div class="wrapper">
    <div class="wrapper">
        <img src="../uploads/<?php echo $_SESSION['login']['user_avatar']; ?>" alt="" style="height: 100px;" />
        <p>Hello, <?php echo $_SESSION['login']['user_email']; ?></p>
        <form action="" method="POST">
            <button class="button_out" type="submit" name="log_off">
                Выйти
            </button>
        </form>
    </div>
</body>
</html>