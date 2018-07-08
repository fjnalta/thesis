# CoAP Client

## Installation
Vor dem Start müssen die benötigten NodeJS Module auf dem System bereitgestellt werden.
```
npm install
```

## Start
Anschließend kann der Client gestartet werden.
```bash
node index.js
```

Dieser sendet die Messungen der Temperatursensoren zum Monitoringsystem. Die Zieladresse kann in der Datei ```config.js``` konfiguriert werden.

### Autostart
Um einen automatischen Start des Servers bei Systemstart zu ermöglichen, kann das Paket pm2, welches eines Prozessmanager für Node bereitstellt, genutzt werden.

Zuerst muss das Paket global auf dem System mit Hilfe des Paketmanagers ```npm``` installiert werden
```bash
npm install pm2@latest -g
```

Anschließend wird der Client über ```pm2``` gestartet, um ihn in die Prozessliste aufzunehmen.

```bash
pm2 start index.js
```

Anschließend wird Autostart des ```pm2``` über Systemd konfiguriert. Hierzu werden die folgenden Befehle genutzt:

```bash
pm2 startup systemd
```

und der daraus resultierende Befehl
```bash
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u i40 --hp /home/i40
```

Anschließend wird die vorhandene Prozessliste gespeichert und bei jedem Systemstart bereitgestellt.
```bash
pm2 save
```

Dies erstellt einen Dienst für den NodeJS Prozessmanager. Nun kann der Autostart der NodeJS Server mit Hilfe des Systemd Dienstes bereitgestellt werden

```bash
systemctl enable pm2-i40
```