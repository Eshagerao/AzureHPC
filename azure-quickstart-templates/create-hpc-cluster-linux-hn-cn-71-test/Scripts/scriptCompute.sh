#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.
usuario=$1

cd /home/$usuario
echo "-----------------------------------------------" >> info
echo "Los nombres de los host se encuentran en" >> info
echo "/mnt/nfs/home/hosts" >> info
echo "-----------------------------------------------" >> info
echo "Las claves privadas y publicas se encuentran en" >> info
echo "/mnt/nfs/home/$usuario/.ssh/id_rsa" >> info
echo "-----------------------------------------------" >> info

#Disable firewall
systemctl disable firewalld
systemctl stop firewalld

yum clean all
yum install deltarpm -y
yum update NetworkManager.x86_64 -y
yum install nfs-utils -y

mkdir -p /home
mount 10.0.0.4:/home /home