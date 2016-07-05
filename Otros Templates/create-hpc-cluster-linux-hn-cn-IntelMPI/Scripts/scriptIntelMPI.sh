#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.

# Optionally, install IntelMPI
wget https://github.com/JuanJoseGarciaUCLM/AzureHPC/raw/master/Intel%20MPI/Intel_Linux_MPI_Runtime_l_mpi-rt_p_4.1.0.024.tgz
tar xvzf Intel_Linux_MPI_Runtime_l_mpi-rt_p_4.1.0.024.tgz
cd l_mpi-rt_p_4.1.0.024/
sudo ./install.sh -s SilentInstallConfigFile.ini