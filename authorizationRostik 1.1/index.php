<?php
    require_once 'src/include/ath_db.php';

    $data = $_POST;

    $login = htmlspecialchars($data['login']);
    $password = htmlspecialchars(md5($data['password']));

    if (isset($data['do_reg'])) {
        header("Location: src/blocks/register.php");
    }

    if (isset($_SESSION['login'])) {
        header("Location: src/blocks/user.php");
    }
?>

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/css/style.css">
    <title>Авторизация</title>
</head>
<body>
    <div class="wrapper">
        <div class="authorization">
            <form class="authorization__form" action="#" method="POST">
                <div style="max-width: 11.75rem;padding-top: 1rem;font-weight: bold;">
                    <?php
                        if (isset($data['do_log'])) {
                            $check_info = mysqli_query($connection, "SELECT * FROM `users` WHERE `user_login` = '$login' AND `user_password` = '$password'");

                            if (mysqli_num_rows($check_info) == 0) {
                                echo "Не удачная попытка входа";
                            } else {
                                $user = mysqli_fetch_assoc($check_info);
                                $_SESSION['logger_user'] = [
                                        "user_login" => $user['user_login'],
                                        "user_email" => $user['user_email'],
                                        "user_avatar" => $user['avatar']
                                ];
                                $_SESSION['login'] = $user;
                                header("Location: src/blocks/user.php");
                            }
                        }

                    ?>
                </div>
                <div class="authorization__login">
                    <p class="login">Логин</p>
                    <input type="text" name="login">
                    <p>Пароль</p>
                    <input type="password" name="password">
                </div>

                <div class="authorization__buttons">
                    <button class="authorization__button_log" type="submit" name="do_log">
                        <span class="button__click">Войти</span>
                    </button>
                    <button class="authorization__button_reg" type="submit" name="do_reg">
                        <span class="button__click">Зарегистрироваться</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    <?php

    ?>
</body>
</html>


