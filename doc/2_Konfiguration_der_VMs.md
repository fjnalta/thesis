# 2 Konfiguration der virtuellen Maschinen
Nach der Erstellung der virtuellen Maschinen müssen diese zur Durchführung der Anwendungsszenarien grundlegend konfiguriert werden.

Auf den Systemen "mgmt" und "comp" wird ein Ubuntu 18.04 LTS Server installiert. Auf dem System "i40" wird ein Ubuntu 18.04 LTS Client genutzt, um eine grafische Oberfläche zur Analyse der Netzwerkpakete bereitzustellen und die leichtere Handhabung des Systems zu Demonstrationszwecken zu ermöglichen.

Nach der Installation des Grundsystems wird der Hostname überprüft

```bash
cat /etc/hostname
```

und ggf. angepasst,

```bash
hostnamectl set-hostname <i40/mgmt/comp>
```

auf allen Maschinen Systemupdates durchgeführt

```bash
apt update && apt upgrade && apt autoremove
```

und die benötigte Netzwerkkonfiguration mit Hilfe von Netplan in der Konfigurationsdatei 
```bash
/etc/netplan/50-cloud-init.yaml
```
bereitgestellt.

Die Netzwerkkonfiguration der virtuellen Maschinen findet analog zum erstellten Konzept statt und wird im folgenden für jede virtuelle Maschine beschrieben.

![Konzept Bausteinsicht](https://github.com/fjnalta/thesis/blob/master/tex/bilder/vm.png)

## VM mgmt
```bash
network:
    ethernets:
        enp0s3:
            addresses: []
            dhcp4: true
            optional: true
        enp0s8:
            addresses: [10.0.0.1/24]
            dhcp4: false
            gateway4: 10.0.2.15
            nameservers: 
                search: [i40-network.lan]
                addresses: [10.0.0.1]
        enp0s9:
            addresses: [10.0.10.1/24]
            dhcp4: false
            gateway4: 10.0.2.15
            nameservers:
                search: [i40-monitoring.lan]
                addresses: [10.0.0.1]
    version: 2
```

## VM comp
```bash
network:
    ethernets:
        enp0s3:
            addresses: []
            dhcp4: true
            optional: true
    version: 2
```

## VM i40
Die Konfiguration des Client Systems findet mit Hilfe des von Ubuntu bereitgestellten Netzwerkmanagers statt und sieht folgendermaßen aus:

![VM i40 Network](https://github.com/fjnalta/thesis/blob/master/doc/img/i40-network.png)

---

Nach der Änderung ist ein erneutes Laden der Netzwerkkonfiguration notwendig. Dies geschieht mit 

```bash
netplan apply
```

Des Weiteren muss, um die bisherige Industrie 4.0 Containervirtualisierung ausführen zu können, die [hier](https://github.com/sneppa/i40-testbed) beschriebene Konfiguration des Testsystems durchgeführt werden. Die Kommunikation der virtuellen Maschinen mit externen Netzwerken ist nach der Konfiguration des Routers auf der virtuellen Maschine "mgmt" möglich.