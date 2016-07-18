#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.

curl -L http://cpanmin.us | sudo perl - --self-upgrade
cpanm --sudo install App::perlbrew
cpanm --sudo XML::LibXML