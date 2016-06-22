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

# Create dir .ssh and public ssh key
echo "Create dir .ssh and public ssh key" >> /home/logg
mkdir /home/$user/.ssh
chmod 777 .ssh
su - $user -c "$idrsaf"
echo "$idrsaf" >> /home/logg
#su - $user -c 'ssh-keygen -t rsa -N "" -f /home/user01/.ssh/id_rsa'

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

# Add host to export NFS, IP and name to hosts file and host to known_host for SSH
echo "##Add host to export NFS, IP and name to hosts file and host to known_host for SSH" >> /home/logg
cd /etc
var2=4
for ((i=0;i<var1;i+=1));
do
var2=$((var2 + 1))
echo "/home           10.0.0.$var2(rw,sync,no_root_squash,no_subtree_check)" >> exports
if [ "$i" -lt 10 ] ; then
    echo "10.0.0.$var2 $vmname$var00$i" >> hosts
else
         if [ "$i" -lt 100 ] ; then
                 echo "10.0.0.$var2 $vmname$var0$i" >> hosts
         else
                 echo "10.0.0.$var2 $vmname$i" >> hosts
         fi
fi
#ssh-keyscan -H 10.0.0.$var2 >> /home/$user/.ssh/known_hosts
# known_hosts para que sean del usuario
echo "##known_hosts para que sean del usuario" >> /home/logg
khst1='ssh-keyscan -H 10.0.0.'
khst2=$khst1$var2
khst1="$khst2 >> /home/"
khst2=$khst1$user
khstf="$khst2/.ssh/known_hosts"
#echo $khstf
su - $user -c "$khstf"
echo "$khstf" >> /home/logg
#su $user -c 'ssh-keyscan -H 10.0.0.$var2 >> /home/$user/.ssh/known_hosts'
done

# Permisos de la carpeta /home/usuario/.ssh
chown -R $user:$user /home/$user/.ssh

#Start the NFS service
systemctl restart nfs-server 

echo "##Fin del script" >> /home/logg
# Finally install GCC (c++ and fortran) and OPEN_MPI
#yum install make gcc gcc-c++ gcc-gfortran -y
#yum -y install openmpi openmpi-devel -y
# solo se puede installar openmpi, conflictos con la libreria de intel
# aunque se pueden installar con "--skip-broken"