# 4 Konfiguration DHCP
Die Installation des DHCP Servers findet auf der virtuellen Maschine "mgmt" statt.

## Installation
Als DHCP Server wird das Paket ```isc-dhcp-server``` genutzt. Dieses ist in den Ubuntu Paketquellen vorhanden.

```bash
apt install isc-dhcp-server
```

## Konfiguration
Anschließend wird die DHCP Konfiguration in der Datei ```/etc/dhcp/dhcpd.conf``` durchgeführt. Folgende Konfiguration wird angewandt:

```bash
# Include rndc-key for automatic DNS Updates
include "/etc/dhcp/ddns-keys/rndc.key";

allow unknown-clients;
use-host-decl-names on;
default-lease-time 600;
max-lease-time 7200;

# activate DDNS Updates
ddns-updates on;
ddns-update-style standard;

# If this DHCP server is the official DHCP server for the local
# network, the authoritative directive should be uncommented.
authoritative;

# Logging on a different log file
log-facility local7;

# Declare Forward Zone for automatic DNS Updates
zone i40-network.lan. {
	primary 10.0.0.1;
	key rndc-key;
}

# Declare Reverse Zone for automatic DNS Updates
zone 0.0.10.in-addr.arpa. {
	primary 10.0.0.1;
	key rndc-key;
}

# Declare DHCP Range and IP Parameters
subnet 10.0.0.0 netmask 255.255.255.0 {
	range 10.0.0.2 10.0.0.10;
	option subnet-mask 255.255.255.0;
	option domain-name-servers 10.0.0.1;
	option domain-name "i40-network.lan";
	option routers 10.0.0.1;
	ddns-domainname "i40-network.lan.";
	ddns-rev-domainname "0.0.10.in-addr.arpa.";
}
```

Der Symmetrische Schlüssel, welcher zu Beginn der Datei eingebunden wird, wird bei der Bereitstellung des DNS Servers erstellt.

Die Bereitstellung der Konfiguration und das Binden des Dienstes geschieht in der Datei ```/etc/default/isc-dhcp-server```.

```bash
# Path to dhcpd's config file (default: /etc/dhcp/dhcpd.conf).
DHCPDv4_CONF=/etc/dhcp/dhcpd.conf

# Path to dhcpd's PID file (default: /var/run/dhcpd.pid).
DHCPDv4_PID=/var/run/dhcpd.pid

# On what interfaces should the DHCP server (dhcpd) serve DHCP requests?
INTERFACESv4="enp0s8"
```

## Start
Um die Konfigurationsänderungen zu übernehmen und den DHCP Server im Netzwerk "i40-network" bereitzustellen muss der Dienst neu gestartet werden.

```bash
systemctl restart isc-dhcp-server
```

Eine automatische Bereitstellung des Dienstes nach Systemneustart wird ebenfalls mit Hilfe von ```systemctl``` durchgeführt.

```bash
systemctl enable isc-dhcp-server
```

## Latenz hinzufügen
Um im späteren Verlauf das Anwendungsszenario eines Rogue DHCP Servers im Netzwerk vereinfacht darstellen zu können, wird mit Hilfe des Tools ```tc``` (Traffic Control) ein virtuelles Delay auf den Netzwerkadapter des DHCP Servers gelegt, um sicherzustellen, dass die Pakete des Rogue DHCP Servers in jedem Fall schneller beim anzugreifenden Client eintreffen als die des authorativen DHCP Servers. Da dies jedoch den Betrieb des Netzwerks beschränkt, sollte das Delay nur während der Durchführung des Anwendungsszenarios angewandt werden.

```bash
tc qdisc add dev enp0s8 root netem delay 500ms
```

Der Status der angewandten Latenz kann mit 
```bash
tc -s qdisc
```
eingesehen werden.