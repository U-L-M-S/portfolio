<?php

$fname = htmlspecialchars($_POST["fname"]);
$lname = htmlspecialchars($_POST["lname"]);
$email = htmlspecialchars($_POST["email"]);
$tel   = htmlspecialchars($_POST["tel"]);
$sub   = htmlspecialchars($_POST["sub"]);
$msg   = htmlspecialchars($_POST["msg"]);


$mail = new PHPMailer(true); // Set to true to enable exceptions

try {
  // Server settings (replace with your details)
  $mail->SMTPDebug = 0; // Enable verbose debug output (optional)
  $mail->isSMTP();                                            // Send using SMTP
  $mail->Host       = 'smtp.office365.com';  // Set the SMTP server address
  $mail->Port       = 587;                                    // Set the SMTP port
  $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
  $mail->Username   = 'your_email@outlook.de';                     // SMTP username
  $mail->Password   = 'your_outlook_password';                               // SMTP password
  $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted

  // Recipients
  $mail->setFrom('your_email@outlook.de', 'Levi Seebacher Contact Form');
  $mail->addAddress('my_Email@outlook.de'); // Your recipient email

  // Content
  $mail->isHTML(true);                                  // Set email format to HTML
  $mail->Subject = 'Website Contact Form - ' . $sub;
  $mail->Body    = "<h3>New Contact Form Submission</h3>
                   <p>Name: $fname $lname</p>
                   <p>Email: $email</p>
                   <p>Phone: $tel</p>
                   <p>Subject: $sub</p>
                   <p>Message: $msg</p>";
  $mail->AltBody = "This is the text-only body";

  $mail->send();
  echo 'Message has been sent successfully!';
} catch (Exception $e) {
  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>