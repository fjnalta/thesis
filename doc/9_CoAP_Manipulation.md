# 9 Manipulation ungesicherter CoAP Kommunikation
Das Anwendungsszenario der CoAP Manipulation wird durch ein Zusammenspiel von CoAP Manipulationssystem und Monitoringsystem bereitgestellt.

Das CoAP Manipulationssystem wird durch einen einfachen CoAP Client dargestellt und auf dem Clientsystem ausgeführt. Das Monitoringsystem wird auf der Management VM ausgeführt und wird als Zieladresse genutzt. Als Titel werden aus dem MitM Angriff gewonnene Payload Titel des CoAP Pakets genutzt.

## Benötigte Komponenten
* [CoAP Client](https://github.com/fjnalta/thesis/blob/master/src/CoAP_Client/README.md)
* [CoAP Server](https://github.com/fjnalta/thesis/blob/master/src/CoAP_Server/README.md)
* [CoAP Manipulationssystem](https://github.com/fjnalta/thesis/blob/master/src/CoAP_Manipulation/README.md)


## Durchführung

### Start der Komponenten
Zuerst muss der Server gestartet werden. Das Webinterface des Monitoringsystems ist unter der Adresse  http://10.0.10.1:9999 erreichbar.

Anschließend kann optional der Client gestartet werden, um das Monitoringsystem mit validen Daten zu versorgen.

### Durchführung des Angriffs
Zuletzt wird das Manipulationssystem mit folgenden Parametern gestartet werden, um das Monitoringsystem anzugreifen:
```
node index.js coap://10.0.10.1/moldingmachine/1 Temperatursensor_#2 0.5
```

## Visualisierung
Nach dem Eintreffen der gefälschten Pakete am Monitoringsystem, wird dort die Temperatur des gewählten Sensors beeinflusst und zum Alarm gebracht.

![CoAP Monitoringsystem](https://github.com/fjnalta/thesis/blob/master/tex/bilder/coap-monitoring.png)