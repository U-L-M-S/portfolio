<?php

// Include PHPMailer library (download from https://github.com/PHPMailer)
require 'PHPMailer/PHPMailerAutoload.php';

// Define your recipient email address
$recipientEmail = 'your_email@example.com';

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['tel'];
$subject = $_POST['subject'];
$message = $_POST['msg'];

// Create a new PHPMailer instance
$mail = new PHPMailer();

// Tell PHPMailer to use SMTP (comment out if your server uses a different method)
$mail->isSMTP();

// Configure SMTP settings (replace with your server's details)
$mail->Host = 'smtp.yourserver.com'; // Replace with your SMTP server address
$mail->Port = 587; // Replace with your SMTP port (might be different)
$mail->SMTPAuth = true;
$mail->Username = 'your_username'; // Replace with your SMTP username
$mail->Password = 'your_password'; // Replace with your SMTP password
$mail->SMTPSecure = 'tls'; // Replace with the appropriate encryption (tls or ssl)

// Set email settings
$mail->setFrom($email, $name);
$mail->addReplyTo($email, $name);
$mail->addAddress($recipientEmail);
$mail->Subject = $subject;

// Set email body with HTML formatting (optional)
$body = "<h2>Contact Form Submission</h2>
<p>Name: $name</p>
<p>Email: $email</p>
<p>Phone: $phone</p>
<p>Message: $message</p>";
$mail->isHTML(true); 
$mail->Body = $body;

// Send the email
if ($mail->send()) {
  echo 'Thank you for your message! We will be in touch shortly.';
} else {
  echo 'There was an error sending your message. Please try again later.';
}

?>
