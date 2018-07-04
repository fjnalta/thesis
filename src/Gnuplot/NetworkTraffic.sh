#!/bin/bash

js52 calculateNetworkTraffic.js 60 > 60bytes.dat
js52 calculateNetworkTraffic.js 3385 > 3385bytes.dat

# TODO Gnuplot from Bash -> gnuplot -e
set xlabel "Packets/s"
set ylabel "Gigabit/s"
set yrange [0:0.5]
set xrange [0:15000]
plot "60bytes.dat" title "Quellnetz" with lines, "3385bytes.dat" title "Zielnetz" with lines

# Output File