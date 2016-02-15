#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.
var1=$1
var2=4

cd /home
for ((i=0;i<var1;i+=1));
do
echo "IaaSLnxCN-00$i" >> hosts.txt
done

mkdir /home/userBBDD001/.ssh
ssh-keygen -t rsa -N "" -f /home/userBBDD001/.ssh/my.key

yum install nfs-utils nfs-utils-lib -y
service rpcbind start
service nfs start

cd /etc
for ((i=0;i<var1;i+=1));
do
var2=$((var2 + 1))
echo "/home           10.0.0.$var2(rw,sync,no_root_squash,no_subtree_check)" >> exports
done
