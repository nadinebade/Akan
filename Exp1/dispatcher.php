<?php
// Get a global counter from server and update counter
$counter_file = "/tmp/dispatch-counter-1";
$counter_val = file_get_contents($counter_file);
file_put_contents($counter_file, $counter_val + 1);

// Possible redirections
$redirects = array("https://psycholinguae.fr/nbade/Akan/Exp1/list1.html",
                   "https://psycholinguae.fr/nbade/Akan/Exp1/list2.html",
                   "https://psycholinguae.fr/nbade/Akan/Exp1/list3.html",
                   "https://psycholinguae.fr/nbade/Akan/Exp1/list4.html");
// Redirect user to the next link
header("Location: " . $redirects[$counter_val % count($redirects)]);
?>
