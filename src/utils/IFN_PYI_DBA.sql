#Crear un usuario DBA
create user if not exists usuario_ifnAcces@localhost identified by "IFNP1";

#Creamos la base de datos 
create database IFN_P1_DBA;

#Asignar permisos al usuario 
grant all privileges on IFN_P1_DBA .* to usuario_ifnAcces@localhost;
flush privileges;