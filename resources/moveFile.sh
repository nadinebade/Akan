#!/bin/bash

# Because of weird rights issues with PHP this scripts takes the output of PHP,
# in the /tmp dir, and moves it where it belongs in my home dir

mkdir -p $2
cp $1 $2
chmod -Rv --quiet 777 $2
