<?php header("Content-Type: text/html; charset=utf-8"); ?>
<?php
$arResult['ok'] = "N";
$myFaile = ""; 
$file_name = "";

$directory = time();
mkdir($_SERVER['DOCUMENT_ROOT'] ."/upload/" . $directory);
$files = [];

//сохраняем наш файл на сервер в папку /upload/
//если не хотите хранить файл на сервере, не забывайте его потом удалить после отправки
if (!empty($_FILES['cv']['tmp_name'])) { 

    
    
	$path = $_SERVER['DOCUMENT_ROOT']."/upload/$directory/".rand(1000000, 1000000000).'-'.$_FILES['cv']['name'];
        $files[$path] = $_FILES['cv']['name'];
    
    

	if (copy($_FILES['cv']['tmp_name'], $path)){ 
		$myFaile = $path; 
		$file_name = $_FILES['cv']['name'];
	}
} 


$to = "varlakovalexandr@mail.ru"; //Кому
$from = "mysite@gmail.com"; //От кого
$subject = "Сообщение с сайта meropolitan"; //Тема
$message = "Пришло сообщение с сайта meropolitan :"; //Текст письма

$message .= "Имя :  " . $_POST['name'] .";";
$message .= " Телефон: " . $_POST['phone'] . ";";
$message .= " Сообщение: " . $_POST['message'] . ";";





$boundary = "--".md5(uniqid(time())); //Разделитель
  /* Заголовки */
  $headers = "From: $from\nReply-To: $from\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"";
  $EOL = "\r\n";
  $body = "--$boundary\n";
  /* Присоединяем текстовое сообщение */


  //$body .= "Content-type: text/html; charset='utf-8'\n";
  //$body .= "Content-Transfer-Encoding: quoted-printablenn";
  //$body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($message)."?=\n\n";
  //$body .= chunk_split(base64_encode($message));
  
    $body .= "Content-Type: text/html; charset=utf-8$EOL";   
    $body .= "Content-Transfer-Encoding: base64$EOL";   
    $body .= $EOL; 
    $body .= chunk_split(base64_encode($message));
  
  $body .= "--$boundary\n";


   foreach ( $files as $pathFile => $fileName ){
        $file = fopen($pathFile, "r"); //Открываем файл
        $fileContent = fread($file, filesize($pathFile)); //Считываем весь файл
        fclose($file); //Закрываем файл
        /*
        $body .=  "$EOL--$boundary$EOL";   
        $body .= "Content-Type: application/octet-stream; name=\"$fileName\"$EOL";   
        $body .= "Content-Transfer-Encoding: base64$EOL";   
        $body .= "Content-Disposition: attachment; filename=\"$fileName\"$EOL";   
        $body .= $EOL;  
        $body .= chunk_split(base64_encode($fileContent));   

        $body .= "$EOL--$boundary--$EOL";   */

        $body .= "--$boundary\n"; 
        $body .= "Content-Type: application/octet-stream\n"; 
        $body .= "Content-Transfer-Encoding: base64\n"; 
        $body .= "Content-Disposition: attachment; filename = \"".$fileName."\"\n\n"; 
        $body .= chunk_split(base64_encode($fileContent))."\n";
   }

 

 
  mail($to, $subject, $body, $headers);
  
  

foreach ($files as $fileDir => $fileName){
    unlink($fileDir);
}
$delDir = $_SERVER['DOCUMENT_ROOT']."/upload/$directory";
rmdir($delDir);
$arResult['ok'] = "Y";
echo json_encode($arResult);
