<?php

// get parameters from call AND escape potential attacks (?)
$project = escapeshellcmd($_POST['project']);
$filename = "/tmp/exp_" . $project . '/' . $project . "-" . $_POST['filename'] . ".csv";
$data = $_POST['filedata'];

if(!file_exists(dirname($filename)))
    mkdir(dirname($filename), 0777, true);

if (!$handle = fopen($filename, 'w'))
    exit;

if (fwrite($handle, $data) === FALSE)
    exit;

fclose($handle);
chmod ($filename, 0777);

shell_exec("/home/smascarenhas/public_html/experiments/resources/moveFile.sh ".$filename." /home/smascarenhas/data/".$project."/ 2>&1");

system("rm -rf ".$filename);

?>
