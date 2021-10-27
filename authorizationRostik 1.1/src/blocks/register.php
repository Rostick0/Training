<?php
    require_once '../include/ath_db.php';

    $data = $_POST;

    $login = htmlspecialchars($data['login']);
    $email = htmlspecialchars($data['email']);
    $password = htmlspecialchars($data['password']);
    $password2 = htmlspecialchars($data['password2']);

    $errors = array();

    if (isset($data['do_reg'])) {
        if(!preg_match("/^[a-zA-Z0-9]+$/",$data['login'])) {
            $errors[] = "Логин может состоять только из букв английского алфавита и цифр";
        }

        if (strlen(trim($login)) < 3 or strlen(trim($login)) > 21) {
            $errors[] = 'Ваш логин слишком короткий или длинный, допустимая длина (4-20)';
        }
        if (trim($login) == '') {
            $errors[] = 'Введите ваш логин';
        }
        if (trim($email) == '') {
            $errors[] = 'Введите ваш email';
        }
        if (empty($password)) {
            $errors[] = 'Введите пароль';
        }
        if (strlen($password) < 7 or strlen($password) > 31) {
            $errors[] = 'Допустимая длина пароля 8-30';
        }
        if ($password !== $password2) {
            $errors[] = 'Пароли не совпадают';
        }

        $check_login = mysqli_query($connection,"SELECT `user_login` FROM `users` WHERE `user_login` = '$login'");
        $result_login = mysqli_fetch_assoc($check_login);

        if (mysqli_num_rows($check_login) != 0) {
            $errors[] = 'Такой логин уже существует';
        }

        $check_email = mysqli_query($connection,"SELECT `user_email` FROM `users` WHERE `user_email` = '$email'");
        $result_email = mysqli_fetch_assoc($check_email);

        if (mysqli_num_rows($check_email) > 0) {
            $errors[] = 'На такую почту аккаунт уже зарегистрирован';
        }

        if (empty($errors)) {
            $password = md5($password);

            $path = time() . $_FILES['avatar']['name'];

            move_uploaded_file($_FILES['avatar']['tmp_name'],"../uploads/$path");

            $sql = mysqli_query($connection,"INSERT INTO `users` (`user_login`, `user_email`, `user_password`, `user_avatar`) VALUES ('$login', '$email', '$password', '$path')");


           // header('Location: user.php');


        } else {

            function errors($errors) {
                echo '<div class="" style="max-width: 11.75rem;padding-top: 1.2rem;font-weight: bold;">'.array_shift($errors).'</div>';
            }
        }


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
    <title>Авторизация</title>
</head>
<body>
<div class="wrapper">
    <div class="authorization">
        <form class="authorization__form" action="#" method="POST" enctype="multipart/form-data">

            <?php
                if (isset($data['do_reg'])) {
                    if (!empty($errors)) {
                        errors($errors);
                    }
                }
            ?>
            <div class="authorization__login">
                <p class="login">Логин</p>
                <input type="text" name="login">
                <p>Email</p>
                <input type="email" name="email">
                <p>Пароль</p>
                <input type="password" name="password">
                <p>Повторите пароль</p>
                <input type="password" name="password2">
                <p>Ваше фото</p>
                <div>
                    <input class="input__hide input__file" type="file" name="avatar" id="file">
                    <label for="file">
                        <span class="authorization__photo">
                            Загрузить
                        </span>
                    </label>
                </div>
            </div>

            <div class="authorization__buttons">
                <button class="authorization__button_reg" type="submit" name="do_reg">
                    <span class="button__click">Зарегистрироваться</span>
                </button>
            </div>
        </form>
    </div>
</div>
</body>
</html>
