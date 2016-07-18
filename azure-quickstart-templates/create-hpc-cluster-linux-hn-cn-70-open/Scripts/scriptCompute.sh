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
curl -L http://cpanmin.us | perl - --self-upgrade
su - $usuario -c 'cpanm --sudo install App::perlbrew'
su - $usuario -c 'cpanm --sudo XML::LibXML'
#cpanm --sudo install App::perlbrew
#cpanm --sudo XML::LibXML

setsebool -P use_nfs_home_dirs 1