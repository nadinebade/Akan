<?php

// get parameters from call AND escape potential attacks (?)
$project = escapeshellcmd($_POST['project']);
$filename = "/homez.48/psycholifz/www/nbade/tmp/exp_" . $project . '/' . $project . "-" . $_POST['filename'] . ".csv";
$post_data = json_decode(file_get_contents('php://input'), true);
$data = $post_data['filedata'];

file_put_contents($filename, $data);

if(!file_exists(dirname($filename)))
    mkdir(dirname($filename), 0777, true);

if (!$handle = fopen($filename, 'w'))
    exit;

if (fwrite($handle, $data) === FALSE)
    exit;

fclose($handle);
chmod ($filename, 0777);

shell_exec("/homez.48/psycholifz/www/nbade/resources/moveFile.sh ".$filename." /homez.48/psycholifz/www/nbade/data/".$project."/ 2>&1");

system("rm -rf ".$filename);

?>



