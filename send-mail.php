<?php
    $phone = $_POST['phone'];
    $name = $_POST['name'];
 
    $to      = 'varlakovalexandr@mail.ru';
    $subject = 'Сообщение с сайта: http://html-test.tmweb.ru/';
    $message = 'Cообщение от: ' . $name . "\r\n".'Телефон:' .$phone. "\r\n";
    $headers = 'From: varlakovalexandr.ru' . "\r\n" .
    'Reply-To: varlakovalexandr.ru' . "\r\n" .
    'X-Mailer: PHP/';

	mail($to, $subject, $message, $headers);
    
?>