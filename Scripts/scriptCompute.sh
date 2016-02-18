#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.
user=$1

echo "-----------------------------------------------" >> info
echo "Los nombres de los host se encuentran en" >> info
echo "/mnt/nfs/home/hosts" >> info
echo "-----------------------------------------------" >> info
echo "Las claves privadas y publicas se encuentran en" >> info
echo "/mnt/nfs/home/$user/.ssh/id_rsa" >> info
echo "-----------------------------------------------" >> info

# Disable firewall
systemctl disable firewalld
systemctl stop firewalld

mkdir ~/.ssh
ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa

yum clean all
yum install nfs-utils nfs-utils-lib -y

mkdir -p /mnt/nfs/home
mount 10.0.0.4:/home /mnt/nfs/home
