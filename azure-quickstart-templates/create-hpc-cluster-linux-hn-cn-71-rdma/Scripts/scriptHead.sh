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

# Install NFS server packages
echo "##Install NFS server packages" >> /home/logg
yum clean all
yum install deltarpm -y

# We need to update some packages to solve some problems
echo "##We need to update some packages to solve some problems" >> /home/logg
#yum update -y
yum update NetworkManager.x86_64 -y
yum install nfs-utils -y

# Next we need to start the services and add them to the boot menu.
echo "##Next we need to start the services and add them to the boot menu." >> /home/logg
systemctl enable rpcbind
systemctl enable nfs-server
systemctl start rpcbind
systemctl start nfs-server
systemctl start nfs-lock
systemctl start nfs-idmap