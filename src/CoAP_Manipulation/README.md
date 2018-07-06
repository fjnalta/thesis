# CoAP Manipulationssystem

## Installation
Vor dem Start müssen die benötigten NodeJS Module auf dem System bereitgestellt werden.
```
npm install
```

## Start
Der Client kann mit den folgenden Parametern gestartet werden:
```
node index.js [DESTINATION URL] [PAYLOAD TITLE] [INTERVAL]
```
* Destination URL: Zieladresse der Pakete. Format: ```coap://host/address```
* Payload Title: Titel des CoAP Payload
* Interval: Intervall der Paketsendung in Sekunden