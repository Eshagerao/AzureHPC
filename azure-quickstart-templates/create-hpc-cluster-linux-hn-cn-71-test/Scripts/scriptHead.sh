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
cd /home/$user
echo "##known_hosts para que sean del usuario" >> /home/logg
sudo -u user01 ssh-keyscan -H 10.0.0.5 >> /home/$user/.ssh/known_hosts
sudo -u user01 ssh-keyscan -H 10.0.0.6 >> /home/$user/.ssh/known_hosts

echo "##Fin del script test" >> /home/logg