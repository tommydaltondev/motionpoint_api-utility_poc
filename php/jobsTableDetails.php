<?php
include '../config.php';

// Initialize cURL
$curl = curl_init();

// Set cURL options
curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://sandboxapi.motionpoint.com/translationjobs/list?size=10&sort=id%2Cdesc',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
    "statuses": [
        "COMPLETED",
        "QUEUED",
        "ON_HOLD"
    ]
}',
  CURLOPT_HTTPHEADER => array(
    'Authorization: ' . API_KEY,
    'X-MotionCore-Queue: ' . IOL_KEY,
    'X-MotionCore-UserName: ' . USER_ID,
    'Content-Type: application/json'
  ),
));

// Execute the cURL request and decode JSON
$response = curl_exec($curl);
$json_result = json_decode($response, true); 
$tableData = json_decode($response, true)['content'];

// Set statuses
$statusCOMPLETED = "COMPLETED";
$statusQUEUED = "QUEUED";
$statusON_HOLD = "ON_HOLD";

// Populate table with response
echo '<div class="staticContainer">';
echo '<table>';
echo '<tr>';
echo '<th>Status</th>';
echo '<th>Job ID</th>';
echo '<th>Source->Target</th>';
echo '<th>Content Type</th>';
echo '<th>Charset</th>';
echo '<th>Queue ID</th>';
echo '<th>Queue Status</th>';
echo '<th>Receipt Date</th>';
echo '<th>Content</th>';
echo '<th>Display</th>';
echo '</tr>';

foreach ($tableData as $row) {
    echo '<tr>';
    if ($row['status']== $statusCOMPLETED) {
        echo '<td style="color:green">' . $row['status'] . '</td>';
        } elseif ($row['status']== $statusQUEUED) {
        echo '<td style="color:orange">' . $row['status'] . '</td>';
        } elseif ($row['status']== $statusON_HOLD) {
        echo '<td style="color:red">' . $row['status'] . '</td>';
        } else {
        echo '<td>' . $row['status'] . '</td>';
        }
    echo '<td>' . $row['id'] . '</td>';
    echo '<td>' . $row['sourceLanguage'] . '=>' . $row['targetLanguage'] . '</td>';
    foreach ($row['translationJobPages'] as $page ) {
        echo '<td>' . $page['contentType'] . '</td>';
        echo '<td>' . $page['contentCharset'] . '</td>';
        echo '<td>' . $page['id'] . '</td>';
        echo '<td>' . $page['queueStatus'] . '</td>';
    }
    echo '<td>' . $row['receiptDate'] . '</td>';
    echo '<td><a onclick="downloadContent(this.id)" id="' . $row['id'] . '">Download</a></td>';
    echo '<td><a onclick="viewContent(this.id)" id="' . $row['id'] . '">View</a></td>';
    echo '</tr>';
}

echo '</table>';
echo '</div>';

curl_close($curl);
?>