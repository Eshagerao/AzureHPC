#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.
user=$1

cd /home/$user
echo "-----------------------------------------------" >> info
echo "Los nombres de los host se encuentran en" >> info
echo "/mnt/nfs/home/hosts" >> info
echo "-----------------------------------------------" >> info
echo "Las claves privadas y publicas se encuentran en" >> info
echo "/mnt/nfs/home/$user/.ssh/id_rsa" >> info
echo "-----------------------------------------------" >> info

#Disable firewall
systemctl disable firewalld
systemctl stop firewalld

# Create dir .ssh and public ssh key
mkdir /home/$user/.ssh
chmod 777 .ssh
ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa

#yum clean all
#yum install deltarpm -y
#yum update -y
#yum update NetworkManager.x86_64 -y
#yum update lvm2-7:2.02.105-14.el7.x86_64 -y
# install nfs-utils -y

#mkdir -p /mnt/nfs/home
#mount 10.0.0.4:/home /mnt/nfs/home
