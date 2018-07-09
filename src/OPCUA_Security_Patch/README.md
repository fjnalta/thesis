# OPC UA Security Patch

## Installation
Die Installation des Security Patch beinhaltet die Änderung des Quellcodes des [vorhandenen Testsystems](https://github.com/sneppa/i40-testbed).

In diesem Verzeichnis wird die Verzeichnisstruktur des vorhandenen Testsystems abgebildet und die aktualisierten Versionen der benötigten Dateien bereitgestellt. Zur Installation ist nur ein Kopieren der vorhandenen Ordner ```dockers``` und ```scripts``` über die bestehenden Ordner im vorhandenen Testsystem nötig.

## Konfiguration
### Automatisch
Nach dem Kopiervorgang kann die Sicherheitskonfiguration der OPC UA Komponenten control und scheduler mit Hilfe des Scripts ```changeSecurityMode.sh``` angepasst werden. Vor der Änderung der Sicherheitskonfiguration der OPC UA Kommunikation, müssen die Container beendet werden.

```bash
./scripts/stopContainers.sh
```

Mit dem Script ```changeSecurityMode.sh``` wird die Sicherheitskonfiguration angepasst. 

```bash
./scripts/changeSecurityMode.sh [true/false]
```

Die Container werden vom Script nach Änderung der Konfiguration automatisch neu gebaut. Anschließend müssen diese neu gestartet werden.

```bash
./scripts/startDockers.sh
```

### Manuell
Die Sicherheitskonfiguration der OPC UA Komponenten kann in den jeweiligen Konfigurationsdateien der Container ```scheduler``` und ```control``` geändert werden. Hierzu muss der Parameter ```config.secure``` geändert werden.

```js
[...]

config.secure = true;
#config.secure = false;

[...]
```

Nach dem Kopieren ist ein erneutes Bauen der Container notwendig, um die Änderungen am Quellcode zu übernehmen

```bash
docker-compose --file ./dockers/control/docker-compose.yml build
docker-compose --file ./dockers/scheduler/docker-compose.yml build
```

Anschließend können diese wieder gestartet werden

```bash
docker-compose --file ./dockers/control/docker-compose.yml up -d
docker-compose --file ./dockers/scheduler/docker-compose.yml up -d
```