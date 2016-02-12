#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.
var1=$1
cd /home

for ((i=0;i<var1;i+=1));
do
echo "IaaSLnxCN-00$i" >> hosts.txt
done

