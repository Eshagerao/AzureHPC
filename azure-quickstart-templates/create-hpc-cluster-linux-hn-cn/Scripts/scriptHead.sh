#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.
var1=$1
var2=4

# Add hosts names
cd /home
for ((i=0;i<var1;i+=1));
do
echo "IaaSLnxCN-00$i" >> hosts
done

# Create dir .ssh and public ssh key
mkdir /home/userBBDD001/.ssh
chmod 777 .ssh
ssh-keygen -t rsa -N "" -f /home/userBBDD001/.ssh/id_rsa

# Install NFS server packages
yum clean all
yum install nfs-utils nfs-utils-lib -y
service rpcbind start
service nfs start

# Add host to export NFS, IP and name to hosts file and host to known_host for SSH
cd /etc
for ((i=0;i<var1;i+=1));
do
var2=$((var2 + 1))
echo "/home           10.0.0.$var2(rw,sync,no_root_squash,no_subtree_check)" >> exports
echo "10.0.0.$var2 IaaSLnxCN-00$i" >> hosts
ssh-keyscan -H 10.0.0.$var2 >> /home/userBBDD001/.ssh/known_hosts
done

exportfs -a

# Finally install GCC (c++ and fortran) and OPEN_MPI
yum install make gcc gcc-c++ gcc-gfortran -y
yum -y install openmpi openmpi-devel -y