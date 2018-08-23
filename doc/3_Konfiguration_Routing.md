# 3 Konfiguration Routing
Um die Gatewayfunktionalität der virtuellen Maschine "mgmt" zwischen den verschiedenen Netzwerken "host-nat", "i40-network" und "i40-monitoring" für alle Systeme bereitzustellen, wird IPv4 Forwarding in Verbindung mit NAT genutzt.

Dieses muss auf der virtuellen Maschine "mgmt" für die Bereitstellung des gewünschten Dienstes sowie auf der virtuellen Maschine "i40" für die Durchführung der MitM Attacke umgesetzt werden.

Zuerst wird auf beiden Maschinen das IPv4 Forwarding in der Datei ```/etc/sysctl.conf``` aktiviert.

```bash
[...]
# Uncomment the next line to enable packet forwarding for IPv4
net.ipv4.ip_forward=1
[...]
```

Zur Bereitstellung der neuen Konfigurationsparameter müssen die Netzwerkdienste neu gestartet werden.

Anschließend werden die NAT Regeln zur Weiterleitung der Pakete mit Hilfe von ```iptables``` auf der virtuellen Maschine "mgmt" gesetzt, um das Routing in externe Netze über diese Maschine zu ermöglichen. Diese müssen, je nach Bezeichnung der Netzwerkschnittstellen, angepasst werden.

```bash
# Routing i40-network (enp0s8 10.0.0.0) to i40-monitoring (enp0s9 10.0.10.0) 
iptables -t nat -A POSTROUTING -o enp0s9 -j MASQUERADE
iptables -A FORWARD -i enp0s9 -o enp0s8 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i enp0s8 -o enp0s9 -j ACCEPT

# Routing from to (enp0s3 host-nat) to i40-network (enp0s8 10.0.0.0) 
iptables -t nat -A POSTROUTING -o enp0s3 -j MASQUERADE
iptables -A FORWARD -i enp0s3 -o enp0s8 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i enp0s8 -o enp0s3 -j ACCEPT
```

Um die Regeln nach dem Neustart der Systeme weiterhin zur Verfügung zu stellen, werden diese mit Hilfe des Tools ```iptables-save``` in der Datei ```/etc/iptables/rules.v4```, welche beim Start des Systems geladen wird, gespeichert.

```bash
iptables-save > /etc/iptables/rules.v4
```