# 1 Erstellung der virtuellen Maschinen
Die Erstellung der virtuellen Maschinen sowie das Management der neuen Netzwerke findet mit Hilfe der Software Oracle VM VirtualBox statt. In diesem Dokument wird dieser Vorgang beschrieben. Es werden drei virtuelle Maschinen erstellt. Diese beinhalten die folgenden Softwarekomponenten:

| VM Name | Software           | Network  |
| --------|:-------------:| -----:|
| i40     | Docker Testsystem, Rogue DHCP, CoAP Manipulation | i40-network |
| mgmt    | Router, DHCP Server, DNS Server, CoAP Monitoring | Host-NAT, i40-network, i40-monitoring |
| comp    | CoAP Client                                      | i40-network |

Die Ressourcenzuweisung der Systeme kann je nach Ansprüchen und vorgesehenen Erweiterungen am Testsystem zugewiesen werden, sollte jedoch die minimalen Ubuntu 18.04 LTS Client- bzw. Serveranforderungen erfüllen.

Ausschlaggebend für die Funktionalität des Testsystems und der gewählten Konfiguration ist die Netzwerkkonfiguration.

## Netzwerkkonfiguration VM "i40"
![i40 Network Interface 1](https://github.com/fjnalta/thesis/blob/master/doc/img/i40-if1.png)
![i40 Network Interface 2](https://github.com/fjnalta/thesis/blob/master/doc/img/i40-if2.png)

## Netzwerkkonfiguration VM "mgmt"
![mgmt Network Interface 1](https://github.com/fjnalta/thesis/blob/master/doc/img/mgmt-if1.png)
![mgmt Network Interface 2](https://github.com/fjnalta/thesis/blob/master/doc/img/mgmt-if2.png)
![mgmt Network Interface 3](https://github.com/fjnalta/thesis/blob/master/doc/img/mgmt-if3.png)

## Netzwerkkonfiguration VM "comp"
![mgmt Network Interface 1](https://github.com/fjnalta/thesis/blob/master/doc/img/comp-if1.png)