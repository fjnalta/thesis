# 8 Manipulation einer Gatewayadresse mit Hilfe eines Rogue DHCP und anschließendem Man-in-the-Middle
Das Man-in-the-Middle Anwendungsszenario findet zwischen dem CoAP Client und dessen Server, dem Monitoringsystem statt. Das Umleiten der Pakete wird mit Hilfe des Rogue DHCP Servers durchgeführt und durch das Netzwerkanalysetool Wireshark visualisiert.

## Benötigte Komponenten
* [CoAP Client](https://github.com/fjnalta/thesis/blob/master/src/CoAP_Client/README.md)
* [CoAP Server](https://github.com/fjnalta/thesis/blob/master/src/CoAP_Server/README.md)
* [Rogue DHCP Server](https://github.com/fjnalta/thesis/tree/master/doc/6_Konfiguration_Rogue_DHCP.md)
* [Wireshark](https://www.wireshark.org/)

## Durchführung

### Start der Komponenten
Die Systeme CoAP Client und CoAP Server werden ordnungsgemäß im Netzwerk gestartet. Der Client ist somit unter der Adressen 10.0.0.1-100 (DHCP) und der Server unter der Adresse 10.0.10.1 im Netzwerk verfügbar.

### Durchführung des Angriffs
Der Angriff besteht darin, den Rogue DHCP Server zu aktivieren und anschließend den Bezug einer neuen Netzwerkadresse des CoAP Clients zu simulieren.

Zuerst wird der Rogue DHCP Server auf dem Ubuntu 18.04 LTS Client gestartet.
```
systemctl start isc-dhcp-server
```

Anschließend wird mit Hilfe von ```netplan``` ein Neubezug der Netzwerkkonfiguration am CoAP Client durchgeführt.
```
netplan apply
```

Zur besseren Darstellung bedient der Rogue DHCP Server die IP Range 10.0.0.100-253 des Netzwerks. Der CoAP Client sollte nach dem Neubezug eine IP Adresse in diesem Netz haben und als Gateway die Adresse 10.0.0.254 statt 10.0.0.1 nutzen.

## Visualisierung
Die erfolgreiche Durchführung des Man-in-the-Middle Angriffs wird auf der Client VM des Rogue DHCP Servers mit Hilfe des Netzwerkanalysetools Wireshark durchgeführt. Dort ist zu erkennen, dass die Netzwerkpakete, welche vom CoAP Client zum CoAP Server gesendet werden vor dem Start des Rogue DHCP Servers den Netzwerkadapter dessen Systems nicht passiert haben, anschließend aber über die Maschine des Rogue DHCP Servers in das Netz des Monitoringsystems geleitet werden.

![Man-in-the-Middle](https://github.com/fjnalta/thesis/blob/master/tex/bilder/rogueDhcp-validation.png)