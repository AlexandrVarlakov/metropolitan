<?php
    $phone = $_POST['phone'];
    $name = $_POST['name'];
 
    $answer_1 = $_POST['answer_1'];
    $answer_2 = $_POST['answer_2'];
    $answer_3 = $_POST['answer_3'];
    $answer_4 = $_POST['answer_4'];
    $answer_5 = $_POST['answer_5'];




    $to      = 'varlakovalexandr@mail.ru';
    $subject = 'Пришел квиз';
    $message = 'Cообщение от: ' . $name . "\r\n".'Телефон:' .$phone. "\r\n";
    $headers = 'From: varlakovalexandr.ru' . "\r\n" .
    'Reply-To: varlakovalexandr.ru' . "\r\n" .
    'X-Mailer: PHP/';

	mail($to, $subject, $message, $headers);
    
?>