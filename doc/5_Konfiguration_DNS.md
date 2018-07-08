# 5 Konfiguration DNS
Die Installation des DNS Servers findet auf der virtuellen Maschine "mgmt" statt.

## Installation
Als DNS Server wird das Paket ```bind9``` genutzt. Dieses ist in den Ubuntu Paketquellen vorhanden.

```bash
apt install bind9
```

## Konfiguration

### Erstellung des symmetrischen Schlüssels für DDNS Updates
Bei der Installation des Pakets ```bind9``` werden zusätzliche Tools bereitgestellt. Darunter auch ```rndc-confgen``` zur Erstellung des Schlüssels für DDNS Updates.

```bash
rndc-confgen -a -b 512
```

Dies erstellt den Schlüssel im Verzeichnis ```/etc/bind/rndc.key```. Dieser muss die Benutzer und Gruppe ```bind``` sowie die Berechtigungen 640 besitzen:

```bash
ls -lah /etc/bind/rndc.key
-rw-r-----  1 bind bind   77 Jun 25 13:24 rndc.key
```

Anschließend muss der Schlüssel auch in dem in der DHCP Konfiguration genutzten Pfad mit den Berechtigungen des DHCP Servers bereitgestellt werden.

```bash
cp /etc/bind/rndc.key /etc/dhcp/ddns-keys/
chown root:root /etc/dhcp/ddns-keys/rndc.key
chmod 640 /etc/dhcp/ddns-keys/rndc.key
```

### DNS Server Konfiguration
Die Grundlegende Konfiguration des DNS Servers bind findet in der Datei ```/etc/bind/named.conf.options``` statt. Für das Testsystem wurde die folgende Konfiguration genutzt:

```js
// set ACL for i40-network
acl internals {
	127.0.0.1;
	10.0.0.0/24;
};

options {
    // zone directory
	directory "/var/cache/bind";

    // DNS forward address
	forwarders {
		8.8.8.8;
		208.67.220.220;
	};

    // permissions
	allow-query {
        internals;
    };

    allow-query-cache {
        internals;
    };

    recursion yes;
    allow-recursion {
		internals;
    };

	allow-transfer {
		internals;
	};

    // disable dnssec for simplicity
    dnssec-enable no;
    
    // don't auth nxdomain conform to RFC1035
    auth-nxdomain no;
    
    // set ipv4 listen interface
	listen-on-v6 { none; };
	listen-on { 10.0.0.1; };
};
```

Der erstellte symmetrische Schlüssel wird in der Datei ```/etc/bind/named.conf.local``` inkludiert. Dort findet außerdem die Beschreibung Zuständigkeit des DNS Servers für die DNS Zonen statt. Es wird eine Forward- und Reverse Lookup-Zone für das Netzwerk "i40-network" beschrieben. Zur Verwaltung des Testsystems wurde die folgende Konfiguration erstellt.

```js
// include rndc key for DDNS Updates
include "/etc/bind/rndc.key";

// Forward Zone
zone "i40-network.lan" {
	type master;
	file "/var/lib/bind/i40-network.lan.zone";
	allow-update { key rndc-key; };
};

// Reverse Zone
zone "0.0.10.in-addr.arpa" {
	type master;
	file "/var/lib/bind/i40-network.lan.rev.zone";
	allow-update { key rndc-key;  };
};
```

### Definition der Forward Lookup-Zone
Wie in der Konfiguration ```/etc/bind/rndc.key``` beschrieben wird die Datei ```/var/lib/bind/i40-network.lan.zone``` erstellt, um die Definition der Records der Zone vorzunehmen.

```bind
$ORIGIN i40-network.lan.
$TTL 907200
@                   IN  SOA mgmt.i40-network. root.i40-network. (
                        2018062529 ; serial
                        28800      ; refresh (8 hours)
                        3600       ; retry (1 hour)
                        604800     ; expire (1 week)
                        38400      ; minimum (10 hours 40 minutes)
                    )
                    NS  mgmt

i40-Virtualbox      A   10.0.0.254
mgmt                A   10.0.0.1
```

Es werden A Records für die virtuellen Maschinen "i40" und "mgmt" erstellt. Die Maschine "comp" bezieht ihre IP Adresse im späteren Verlauf über DHCP und erhält einen dynamischen DNS Eintrag.

### Definition der Reverse Lookup-Zone
Die Reverse Lookup-Zone wird in ```/var/lib/bind/i40-network.lan.rev.zone``` beschrieben.

```bind
$TTL 907200
@                   IN  SOA mgmt.i40-network.lan.0.0.10.in-addr.arpa. root.i40-network.lan.0.0.10.in-addr.arpa. (
                        2014071423 ; serial
                        28800      ; refresh (8 hours)
                        604800     ; retry (1 week)
                        604800     ; expire (1 week)
                        86400      ; minimum (1 day)
                    )

                    NS  mgmt.dragon.lab.

0                   PTR i40-network.lan.
1                   PTR	mgmt.i40-network.lan.
```

Anschließend müssen die Berechtigungen der Zonendateien und des Verzeichnis für den DNS Server angepasst werden, damit dieser automatische Änderungen per DDNS durchführen kann.

```bash
chown bind:bind /var/lib/bind/*
chmod 664 /var/lib/bind/*
```

### Überprüfung der Konfiguration
Die richtige Syntax der Konfiguration kann mit Hilfe der ```bind``` Tools ```named-checkconf``` bzw. ```named-checkzone``` überprüft werden.

```bash
named-checkconf
# no reply = everything OK

named-checkzone i40-network.lan /var/lib/bind/i40-network.lan.zone
zone i40-network.lan/IN: loaded serial 2018062529
OK

named-checkzone 0.0.10.in-addr.arpa /var/lib/bind/i40-network.lan.rev.zone 
zone 0.0.10.in-addr.arpa/IN: loaded serial 2014071423
OK
```

## Start
Anschließend kann der Dienst gestartet und beim Systemneustart automatisch zur Verfügung gestellt werden.

```bash
systemctl start bind9
systemctl enable bind9
```

Nach dem Start des Dienstes können die erstellten Records vom DNS Server abgerufen werden.

### VM i40
```bash
dig -t A i40-Virtualbox.i40-network.lan
; <<>> DiG 9.11.3-1ubuntu1.1-Ubuntu <<>> -t A i40-Virtualbox.i40-network.lan
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 45356
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;i40-Virtualbox.i40-network.lan.	IN	A

;; ANSWER SECTION:
i40-Virtualbox.i40-network.lan.	907200 IN A	10.0.0.254

;; Query time: 0 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; WHEN: Sun Jul 08 15:41:43 UTC 2018
;; MSG SIZE  rcvd: 75
```

### VM mgmt
```bash
dig -t A mgmt.i40-network.lan
; <<>> DiG 9.11.3-1ubuntu1.1-Ubuntu <<>> -t A mgmt.i40-network.lan
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 29693
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;mgmt.i40-network.lan.		IN	A

;; ANSWER SECTION:
mgmt.i40-network.lan.	907200	IN	A	10.0.0.1

;; Query time: 0 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; WHEN: Sun Jul 08 15:42:21 UTC 2018
;; MSG SIZE  rcvd: 65
```