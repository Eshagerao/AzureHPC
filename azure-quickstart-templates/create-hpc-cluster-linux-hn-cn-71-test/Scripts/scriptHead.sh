#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.
var1=$1
var2=4
vmname=$2
var0=0
var00=00
usuario=$3

# Disable firewall
systemctl disable firewalld
systemctl stop firewalld

# Create dir .ssh and public ssh key
echo "Create dir .ssh and public ssh key" >> /home/logg
mkdir ~/.ssh
chmod 777 .ssh
su - $usuario -c 'ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa'
su - $usuario -c 'cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys'
echo "Host *" >> ~/.ssh/config
echo "     StrictHostKeyChecking no" >> ~/.ssh/config
echo "     UserKnownHostsFile /dev/null" >> ~/.ssh/config
chown -R $user:$usuario /home/$usuario/.ssh

echo "##Fin del script test" >> /home/logg