<?php
include '../config.php';

// Initialize cURL
$curl = curl_init();

// Set cURL options
curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://sandboxapi.motionpoint.com/callbackurl',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    CURLOPT_HTTPHEADER => array(
      'Authorization: ' . API_KEY,
      'X-MotionCore-Queue: ' . IOL_KEY,
      'X-MotionCore-UserName: ' . USER_ID
  ),
));

// Execute the cURL request
$response = curl_exec($curl);
curl_close($curl);

// Output the response
echo $response;
?>