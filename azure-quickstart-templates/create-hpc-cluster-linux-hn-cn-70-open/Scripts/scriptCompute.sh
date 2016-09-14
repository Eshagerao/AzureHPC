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
yum-config-manager --save --setopt=openlogic.skip_if_unavailable=true
yum install deltarpm -y
yum update NetworkManager.x86_64 -y
yum update lvm2-7:2.02.105-14.el7.x86_64 -y
yum install nfs-utils -y

mkdir -p /home

# Next we need to start the services and add them to the boot menu.
echo "##Next we need to start the services and add them to the boot menu." >> /home/logg
systemctl enable rpcbind
systemctl enable nfs-server
systemctl start rpcbind
systemctl start nfs-server
systemctl start nfs-lock
systemctl start nfs-idmap

mount 10.0.0.4:/home /home

# Install packages
yum install cmake svn git tcsh libxml2-devel epel-release gcc gcc-c++ gcc-gfortran mvapich2-devel netcdf-devel netcdf-fortran-devel netcdf-fortran-mpich-devel -y
yum install epel-release netcdf-devel netcdf-fortran-devel netcdf-fortran-mpich-devel -y
yum install -y perl perl-CPAN perl-CPAN-Meta
yum install patch -y

chown -R user01:user01 /usr
chmod -R 777 /usr
su - user01 -c 'curl -L http://cpanmin.us | perl - --self-upgrade'
su - user01 -c 'cpanm install App::perlbrew'
su - user01 -c 'cpanm XML::LibXML'
chown -R root:root /usr
chmod 4755 /usr
chmod u+s /usr/bin/sudo

setsebool -P use_nfs_home_dirs 1