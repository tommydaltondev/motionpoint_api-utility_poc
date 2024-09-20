<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="./assets/styles.css"> 
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap" rel="stylesheet">
<script type="text/javascript" src="./js/mp-createSaveFilefromResponse.js"></script>
<script type="text/javascript" src="./assets/prism.js"></script>
<title>Motionpoint API Sandbox Utility | Dashboard</title>
</head>

<body>
<div class="staticContainer header">
<h1 class="postitle-h neumorph-header">dashboard</h1><h1 class="postitle-sh">motionpoint api</h1>
</div>

<?php include './php/jobsTableDetails.php';?>
<div id="responseContents">
    <pre class="language-javascript">
        <code id="json-data" ></code>
    </pre>
</div>

<?php include './php/jobsTableCreate.php';?>
<?php include './php/configTableCallback.php';?>
</body>
<script type="text/javascript" src="./js/mp-functions.js"></script>
</html>