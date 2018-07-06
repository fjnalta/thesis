# Analyse der Netzwerkkommunikation in Industrie 4.0 Umgebungen und Erweiterung einer protoypischen Security Testumgebung zur Darstellung von Bedrohungsfaktoren

Das GitHub Repository dient der Bereitstellung und Erläuterung der Inbetriebnahme des praktischen Teils der zum Thema zugehörigen [schriftlichen Ausarbeitung](https://github.com/fjnalta/thesis/blob/master/thesis.pdf).

Als Grundlage der Darstellung von Bedrohungsfaktoren in Industrie 4.0 Umgebungen dient das [hier](https://github.com/sneppa/i40-testbed) beschriebene Testsystem sowie dessen Anforderungen.

## Komponenten

* Router
* [DHCP](https://www.isc.org/downloads/dhcp/)
* [DNS](https://www.isc.org/downloads/bind/)
* [OPC UA Security Patch](https://github.com/fjnalta/thesis/tree/master/src/OPCUA_Security_Patch)
* [CoAP Client](https://github.com/fjnalta/thesis/tree/master/src/CoAP_Client)
* [CoAP Server](https://github.com/fjnalta/thesis/tree/master/src/CoAP_Server)
* [CoAP Manipulation](https://github.com/fjnalta/thesis/tree/master/src/CoAP_Manipulation)

## Softwarestack

* [Oracle VM Virtualbox](https://www.virtualbox.org/)
* [Ubuntu 18.04 LTS Client](https://www.ubuntu.com/)
* [Ubuntu 18.04 LTS Server](https://www.ubuntu.com/)
* [NodeJS](https://github.com/nodejs)
* [node-opcua](https://github.com/node-opcua)
* [node-coap](https://github.com/mcollina/node-coap)

## Installation
Die Darstellung von Bedrohungsfaktoren im Industrie 4.0 Testsystem erfordert die Erstellung neuer virtueller Maschinen, deren Konfiguration sowie die Bereitstellung einer Netzwerkinfrastruktur. Die Erstellung dieser Maschinen, deren Konfiguration sowie die Bereitstellung der Netzwerkarchitektur und deren Dienste werden im Ordner ```./doc``` in der folgenden Reihenfolge erläutert:

1. [Erstellung der virtuellen Maschinen](https://github.com/fjnalta/thesis/tree/master/doc/1_Erstellung_der_VMs.md)
2. [Konfiguration der virtuellen Maschinen](https://github.com/fjnalta/thesis/tree/master/doc/2_Konfiguration_der_VMs.md)
3. [Konfiguration Routing](https://github.com/fjnalta/thesis/tree/master/doc/3_Konfiguration_Routing.md)
4. [Konfiguration DHCP](https://github.com/fjnalta/thesis/tree/master/doc/4_Konfiguration_DHCP.md)
5. [Konfiguration DNS](https://github.com/fjnalta/thesis/tree/master/doc/5_Konfiguration_DNS.md)
6. [Konfiguration Rogue DHCP](https://github.com/fjnalta/thesis/tree/master/doc/6_Konfiguration_Rogue_DHCP.md)

Nach der Konfiguration der virtuellen Maschinen und der Kommunikation im Netzwerk können die neuen Komponenten zum Testsystem hinzugefügt werden. Der Quellcode befindet sich im Verzeichnis ```./src```, die Installation und Konfiguration dieser Komponenten sowie die Integration im Testsystem können den jeweiligen README Dateien der Ordner entnommen werden. 

## Durchführung der Anwendungsszenarien
Die vollständige Installation des Systems und der zugehörigen Komponenten ermöglicht es die folgenden Anwendungsszenarien durchzuführen. Die Dokumentation der Anwendungsszenarien und eine Erläuterung der Durchführung ist ebenfalls im Ordner ```./doc``` beschrieben.

* [Darstellung verschlüsselter und unverschlüsselter Kommunikation der OPC UA Komponenten](https://github.com/fjnalta/thesis/tree/master/doc/20_OPCUA_Kommunikation.md)
* [Manipulation einer Gatewayadresse mit Hilfe eines Rogue DHCP und anschließendem Man-in-the-Middle](https://github.com/fjnalta/thesis/tree/master/doc/21_Gateway_MitM.md)
* [Manipulation unidirektionaler, ungesicherter CoAP Kommunikation](https://github.com/fjnalta/thesis/tree/master/doc/22_CoAP_Manipulation.md)

## Kompatibilität

Die Erweiterung des Testsystems um weitere virtuelle Maschinen und Netze nimmt, mit Ausnahme der Einführung einer verschlüsselten Kommunikation zwischen den OPC UA Komponenten, keinen Einfluss auf die bisherige Funktionalität der Industrie 4.0 Umgebung. Die Grundlegende Installation und Konfiguration des Testsystems kann dem zugehörigen GitHub Repository entnommen werden.

Die erstellte Netzwerkarchitektur, dessen Routing sowie die Anwendungsszenarien der CoAP Komponenten können auch ohne die OPC UA Netzwerkumgebung durchgeführt werden.