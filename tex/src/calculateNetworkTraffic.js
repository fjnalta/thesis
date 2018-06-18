// TODO - execution args - implement in c

// normal Packet
for(i=0; i<=40000; i++) {
    console.log(i + " " + ((i*60)/1000000000)*8);
}

// Answer Packet
for(i=0; i<=40000; i++) {
    console.log(i + " " + ((i*3385)/1000000000)*8);
}