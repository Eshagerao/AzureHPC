#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.
var1=$1
var2=4
vmname=$2
var0=0
var00=00
user=$3

# Add host to export NFS, IP and name to hosts file and host to known_host for SSH
cd /etc
for ((i=0;i<var1;i+=1));
do
var2=$((var2 + 1))
ssh-keyscan -H 10.0.0.$var2 >> /home/$user/.ssh/known_hosts
done
