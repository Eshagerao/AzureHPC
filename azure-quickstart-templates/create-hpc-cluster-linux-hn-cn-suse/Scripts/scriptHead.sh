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

# Disable firewall
systemctl disable firewalld
systemctl stop firewalld

# Add hosts names
cd /home
for ((i=0;i<var1;i+=1));
do
if [ "$i" -lt 10 ] ; then
    echo "$vmname$var00$i" >> hosts
else
        if [ "$i" -lt 100 ] ; then
                echo "$vmname$var0$i" >> hosts
        else
                echo "$vmname$i" >> hosts
        fi
fi
done
