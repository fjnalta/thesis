#!/bin/bash

# Routing i40-network (enp0s8 10.0.0.0) to i40-monitoring (enp0s9 10.0.10.0) 
iptables -t nat -A POSTROUTING -o enp0s9 -j MASQUERADE
iptables -A FORWARD -i enp0s9 -o enp0s8 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i enp0s8 -o enp0s9 -j ACCEPT

# Routing from to (enp0s3 host-nat) to i40-network (enp0s8 10.0.0.0) 
iptables -t nat -A POSTROUTING -o enp0s3 -j MASQUERADE
iptables -A FORWARD -i enp0s3 -o enp0s8 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i enp0s8 -o enp0s3 -j ACCEPT