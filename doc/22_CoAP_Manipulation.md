# CoAP Manipulation
Das Anwendungsszenario der CoAP Manipulation wird durch ein Zusammenspiel von CoAP Manipulationssystem und Monitoringsystem bereitgestellt.

Das CoAP Manipulationssystem wird durch einen einfachen CoAP Client dargestellt und auf dem Clientsystem ausgeführt. Das Monitoringsystem wird auf der Management VM ausgeführt und wird als Zieladresse genutzt. Als Titel werden aus dem MitM Angriff gewonnene Payload Titel des CoAP Pakets genutzt.

## Installation
Vor dem Start müssen die benötigten NodeJS Module bereitgestellt werden.
```
npm install
```

## Start
Anschließend kann das System mit Hilfe der folgenden Parameter gestartet werden:
```
node index.js [DESTINATION URL] [PAYLOAD TITLE] [INTERVAL]
```

* Destination URL: Zieladresse der Pakete. Format: ```coap://host/address```
* Payload Title: Titel des CoAP Payload
* Interval: Interval der Paketsendung in Sekunden

## Visualisierung
Nach dem Eintreffen der gefälschten Pakete am Monitoringsystem, wird dort die Temperatur des gewählten Sensors beeinflusst und zum Alarm gebracht.

![CoAP Monitoringsystem](https://github.com/fjnalta/thesis/blob/master/tex/bilder/coap-monitoring.png)