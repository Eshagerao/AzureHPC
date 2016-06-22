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
idrsa1='ssh-keygen -t rsa -N "" -f /home/'
idrsa2=$idrsa1$user
idrsaf="$idrsa2/.ssh/id_rsa"

# Disable firewall
systemctl disable firewalld
systemctl stop firewalld

# Create dir .ssh and public ssh key
echo "Create dir .ssh and public ssh key" >> /home/logg
mkdir ~/.ssh
chmod 777 .ssh
su - $user -c 'ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa'

# Add hosts names
cd /home
for ((i=0;i<var1;i+=1));
do
var2=$((var2 + 1))
if [ "$i" -lt 10 ] ; then
    echo "10.0.0.$var2 $vmname$var00$i" >> hosts
else
        if [ "$i" -lt 100 ] ; then
                echo "10.0.0.$var2 $vmname$var0$i" >> hosts
        else
                echo "10.0.0.$var2 $vmname$i" >> hosts
        fi
fi
done

