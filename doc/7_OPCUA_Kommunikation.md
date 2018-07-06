# 7 Darstellung verschlüsselter und unverschlüsselter Kommunikation der OPC UA Komponenten
Die Darstellung der Kommunikation von OPC UA Komponenten im Secure Channel unter verschiedenen Sicherheitsprofilen wird anhand von Erweiterungen am Testsystem, auf welchem diese Arbeit basiert durchgeführt.

## Benötigte Komponenten
* [Industrie 4.0 Testsystem]()
* [OPC UA Security Patch]()
* [Wireshark]()

## Durchführung

### Update des Systems
Um die verschiedenen Sicherheitsprofile bereitzustellen, müssen die Komponenten des Testsystems um weitere Funktionalität erweitert werden. Der Aktualisierungsprozess des Testsystems wird in der Installationsanleitung des [OPC UA Security Patches](https://github.com/fjnalta/thesis/blob/master/src/OPCUA_Security_Patch/README.md) beschrieben.

### Änderung der Konfiguration
Durch die Aktualisierung stehen zwei Sicherheitsprofile für die Verschlüsselung der Kommunikation zur Verfügung:
* none
* Basic256Sha256

Diese können in den Konfigurationsdateien ```config.js``` der Docker Container ```control``` und ```scheduler``` angepasst werden.

```javascript
[...]
config.secure = true;
//config.secure = false;
[...]
```

### Start der Komponenten
Nach der Änderung der Konfiguration müssen die Container zuerst neu gebaut und anschließend gestartet werden. Dies kann mit Hilfe der im vorhandenen System bereitgestellten Scripte durchgeführt werden.

```bash
docker-compose --file ./dockers/control/docker-compose.yml build
docker-compose --file ./dockers/scheduler/docker-compose.yml build
```

```bash
docker-compose --file ./dockers/control/docker-compose.yml up
docker-compose --file ./dockers/scheduler/docker-compose.yml up
```

## Visualisierung
Die Kommunikation mit Hile der verschiedenen Sicherheitsprofile kann anhand des Netzwerkanalysetools Wireshark direkt am System der Containervirtualisierung veranschaulicht werden. Hierzu wird die Kommunikation der OPC UA Komponenten an der Docker Bridge abgehört und dabei die verschiedenen bereitgestellten Sicherheitsprofile genutzt.

![Sicherheitsprofil 'None'](https://github.com/fjnalta/thesis/blob/master/tex/bilder/opcua-secure-none-res.png)

![Sicherheitsprofil 'SIGNANDENCRYPT'](https://github.com/fjnalta/thesis/blob/master/tex/bilder/opcua-secure-sha-res.png)