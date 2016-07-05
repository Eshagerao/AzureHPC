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
#chmod 777 .ssh
su - $usuario -c 'ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa'
su - $usuario -c 'cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys'
su - $usuario -c 'echo "Host *" >> ~/.ssh/config'
su - $usuario -c 'echo "    UserKnownHostsFile /dev/null" >> ~/.ssh/config'
su - $usuario -c 'echo "    StrictHostKeyChecking no" >> ~/.ssh/config'
su - $usuario -c 'echo "    LogLevel ERROR" >> ~/.ssh/config'
chown -R $usuario:$usuario /home/$usuario/.ssh


# Add host to export NFS. IP and name to hosts file
cd /home
for ((i=0;i<var1;i+=1));
do
var2=$((var2 + 1))
echo "/home           10.0.0.$var2(rw,sync,no_root_squash,no_subtree_check)" >> /etc/exports
if [ "$i" -lt 10 ] ; then
    echo "10.0.0.$var2 $vmname$var00$i" >> /home/$usuario/hosts
    echo "10.0.0.$var2 $vmname$var00$i" >> /etc/hosts
else
        if [ "$i" -lt 100 ] ; then
                echo "10.0.0.$var2 $vmname$var0$i" >> /home/$usuario/hosts
                echo "10.0.0.$var2 $vmname$var0$i" >> /etc/hosts
        else
                echo "10.0.0.$var2 $vmname$i" >> /home/$usuario/hosts
                echo "10.0.0.$var2 $vmname$i" >> /etc/hosts
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
#chmod -R 777 /home

# Next we need to start the services and add them to the boot menu.
echo "##Next we need to start the services and add them to the boot menu." >> /home/logg
systemctl enable rpcbind
systemctl start rpcbind
systemctl enable nfs-server
systemctl start nfs-server
systemctl start nfs-lock
systemctl start nfs-idmap

#Start the NFS service
#systemctl restart nfs-server

chmod 644 /home/$usuario/.ssh/config
chmod 600 /home/$usuario/.ssh/authorized_keys

echo "##Fin del script test" >> /home/logg