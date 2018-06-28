#!/bin/bash

iptables -A FORWARD -i enp0s8 -o enp0s9 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i enp0s9 -o enp0s8 -j ACCEPT
iptables -A FORWARD -i enp0s3 -o enp0s8 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i enp0s8 -o enp0s3 -j ACCEPT
