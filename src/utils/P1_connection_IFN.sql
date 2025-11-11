-- =====================================================
--  BASE DE DATOS: Inventario Forestal Nacional (IFN)
-- =====================================================
USE IFN_P1_DBA;

-- =====================================================
-- TABLAS DE INFORMACIÓN GENERAL
-- =====================================================

-- Tabla de tipos de identificación
CREATE TABLE tipos_identificacion (
    id_tipo_identificacion INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('CC', 'TI', 'CE', 'PAS') NOT NULL UNIQUE
);

-- Ciudades
CREATE TABLE ciudades (
    id_ciudad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_ciudad VARCHAR(100) NOT NULL UNIQUE,
    departamento VARCHAR(100),
    pais VARCHAR(100) DEFAULT 'Colombia'
);

-- Tabla de roles
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de cargos
CREATE TABLE cargos (
    id_cargo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cargo VARCHAR(50) NOT NULL UNIQUE
);

alter table cargos add column descripción text;


-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombreCompleto VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol) 
);
alter table usuarios add column refresh_token text;

-- =====================================================
-- TABLAS DE MODELOS DE ACTORES DEL SISTEMA
-- =====================================================

-- Tabla de personas
CREATE TABLE personas (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo_razon_social VARCHAR(250) NOT NULL,
    id_tipo_identificacion INT NOT NULL,
    numero_identificacion VARCHAR(20) NOT NULL UNIQUE,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    id_ciudad INT NOT NULL, -- Corregido: Uso de FK desde el inicio
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tipo_identificacion) REFERENCES tipos_identificacion(id_tipo_identificacion) ON DELETE CASCADE,
    FOREIGN KEY (id_ciudad) REFERENCES ciudades(id_ciudad)
);
select * from personas;


-- Empleados
CREATE TABLE empleados (
    id_empleado INT PRIMARY KEY,
    FOREIGN KEY (id_empleado) REFERENCES personas(id_persona) 
);
alter table empleados add column id_cargo_empleado int;
alter table empleados add FOREIGN KEY (id_cargo_empleado) REFERENCES cargos(id_cargo); 


-- =====================================================
--  TABLAS: GESTIÓN DE INDIVIDUOS Y MUESTREOS
-- =====================================================


-- =====================================================
--  TABLA 1: CONGLOMERADO (Unidad principal)
-- =====================================================
CREATE TABLE conglomerado (
    id_conglomerado INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    latitud DECIMAL(10,6),
    longitud DECIMAL(10,6),
    altitud DECIMAL(6,2),
    fecha DATE,
    observaciones TEXT
);

-- =====================================================
--  TABLA 2: SUBPARCELA (Unidad de muestreo dentro del conglomerado)
-- =====================================================
CREATE TABLE subparcela (
    id_subparcela INT AUTO_INCREMENT PRIMARY KEY,
    id_conglomerado INT NOT NULL,
    numero_subparcela INT NOT NULL,      -- 1 a 4
    coordenada_relativa VARCHAR(50),     -- por ejemplo: NE, NO, SE, SO
    pendiente DECIMAL(5,2),
    tipo_cobertura VARCHAR(100),
    observaciones TEXT,
    FOREIGN KEY (id_conglomerado) REFERENCES conglomerado(id_conglomerado)
);

-- =====================================================
--  TABLA 3: MUESTREO BOTÁNICO
-- =====================================================
CREATE TABLE muestreo_botanico (
    id_muestreo_botanico INT AUTO_INCREMENT PRIMARY KEY,
    id_subparcela INT NOT NULL,
    fecha_muestreo DATE,
    observaciones TEXT,
    FOREIGN KEY (id_subparcela) REFERENCES subparcela(id_subparcela)
);

-- =====================================================
--  TABLA 4: INDIVIDUO (árboles, palmas, arbustos)
-- =====================================================
CREATE TABLE individuo (
    id_individuo INT AUTO_INCREMENT PRIMARY KEY,
    id_muestreo_botanico INT NOT NULL,
    numero INT,
    especie VARCHAR(100),
    dap DECIMAL(5,2),
    altura_total DECIMAL(5,2),
    azimut DECIMAL(5,2),
    distancia DECIMAL(5,2),
    estado VARCHAR(50),
    categoria_dap VARCHAR(50),
    observaciones TEXT,
    FOREIGN KEY (id_muestreo_botanico) REFERENCES muestreo_botanico(id_muestreo_botanico)
);

-- =====================================================
--  TABLA 5: MUESTREO DE SUELOS
-- =====================================================
CREATE TABLE muestreo_suelo (
    id_muestreo_suelo INT AUTO_INCREMENT PRIMARY KEY,
    id_subparcela INT NOT NULL,
    profundidad_inicial DECIMAL(5,2),
    profundidad_final DECIMAL(5,2),
    textura VARCHAR(50),
    color_munsell VARCHAR(50),
    humedad VARCHAR(50),
    tipo_muestra VARCHAR(50),
    observaciones TEXT,
    FOREIGN KEY (id_subparcela) REFERENCES subparcela(id_subparcela)
);

-- =====================================================
--  TABLA 6: MUESTREO DE DETRITOS LEÑOSOS
-- =====================================================
CREATE TABLE muestreo_detritos_madera (
    id_muestreo_detritos INT AUTO_INCREMENT PRIMARY KEY,
    id_subparcela INT NOT NULL,
    tipo_elemento VARCHAR(50),
    diametro DECIMAL(5,2),
    longitud DECIMAL(5,2),
    estado_descomposicion VARCHAR(20),
    posicion VARCHAR(30),
    observaciones TEXT,
    FOREIGN KEY (id_subparcela) REFERENCES subparcela(id_subparcela)
);



-- =====================================================
--  TABLAS: ASIGNACIÓN DE EQUIPOS
-- =====================================================

-- ============================================
-- TABLA DE EQUIPOS (Brigadas de campo)
-- ============================================
CREATE TABLE equipos (
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_equipo VARCHAR(100) NOT NULL,
    institucion VARCHAR(100),
    estado ENUM('activo','inactivo') DEFAULT 'activo',
    observaciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA DE INTEGRANTES DE EQUIPO
-- (Relaciona empleados con equipos y roles)
-- ============================================
CREATE TABLE integrantes_equipo (
    id_integrante INT AUTO_INCREMENT PRIMARY KEY,
    id_equipo INT NOT NULL,
    id_empleado INT NOT NULL,
    id_cargo INT NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    observaciones TEXT,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo),
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado),
    FOREIGN KEY (id_cargo) REFERENCES cargos(id_cargo)
);

-- ============================================
-- TABLA DE ASIGNACIONES DE EQUIPOS A CONGLOMERADOS
-- ============================================
CREATE TABLE asignaciones_equipos (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    id_equipo INT NOT NULL,
    id_conglomerado INT NOT NULL,
    fecha_asignacion DATE NOT NULL,
    fecha_finalizacion DATE,
    estado ENUM('pendiente','en_progreso','completado') DEFAULT 'pendiente',
    observaciones TEXT,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo),
    FOREIGN KEY (id_conglomerado) REFERENCES conglomerado(id_conglomerado)
);


-- ============================================
-- INSERT DATOS PARA TABLAS 
-- ============================================

-- =====================================================
-- TABLA: tipos_identificacion
-- =====================================================
INSERT INTO tipos_identificacion (tipo)
VALUES ('CC'), ('TI'), ('CE'), ('PAS');

-- =====================================================
-- TABLA: ciudades  (20 ejemplos, puedes ampliarla)
-- =====================================================
INSERT INTO ciudades (nombre_ciudad, departamento, pais) VALUES
('Bogotá', 'Cundinamarca', 'Colombia'),
('Medellín', 'Antioquia', 'Colombia'),
('Cali', 'Valle del Cauca', 'Colombia'),
('Barranquilla', 'Atlántico', 'Colombia'),
('Cartagena', 'Bolívar', 'Colombia'),
('Cúcuta', 'Norte de Santander', 'Colombia'),
('Bucaramanga', 'Santander', 'Colombia'),
('Pereira', 'Risaralda', 'Colombia'),
('Manizales', 'Caldas', 'Colombia'),
('Ibagué', 'Tolima', 'Colombia'),
('Neiva', 'Huila', 'Colombia'),
('Villavicencio', 'Meta', 'Colombia'),
('Armenia', 'Quindío', 'Colombia'),
('Santa Marta', 'Magdalena', 'Colombia'),
('Popayán', 'Cauca', 'Colombia'),
('Montería', 'Córdoba', 'Colombia'),
('Sincelejo', 'Sucre', 'Colombia'),
('Valledupar', 'Cesar', 'Colombia'),
('Pasto', 'Nariño', 'Colombia'),
('Tunja', 'Boyacá', 'Colombia');

-- =====================================================
-- TABLA: roles
-- =====================================================
INSERT INTO roles (nombre_rol)
VALUES ('Administrador'), ('Investigador'), ('Técnico'), ('Coordinador'),
       ('Supervisor'), ('Analista'), ('Asistente'), ('Director');

-- =====================================================
-- TABLA: cargos
-- =====================================================
INSERT INTO cargos (nombre_cargo, descripción)
VALUES
('Jefe de Brigada', 'Responsable general de la brigada de campo'),
('Botánico', 'Encargado de la identificación de especies'),
('Auxiliar de campo', 'Apoyo en la toma de datos y medidas'),
('Técnico SIG', 'Responsable de georreferenciación'),
('Líder de suelos', 'Encargado de muestreos de suelo'),
('Encargado de detritos', 'Mide y clasifica detritos leñosos'),
('Topógrafo', 'Realiza levantamientos topográficos'),
('Chofer', 'Responsable del transporte de campo'),
('Coordinador de equipo', 'Coordina actividades del grupo'),
('Asistente logístico', 'Apoyo en logística y materiales'),
('Analista de datos', 'Procesa la información del campo'),
('Supervisor regional', 'Controla varios equipos'),
('Líder botánico', 'Coordina muestreos botánicos'),
('Encargado de GPS', 'Verifica coordenadas de parcelas'),
('Encargado de inventario', 'Controla herramientas y materiales'),
('Líder técnico', 'Apoya en mediciones complejas'),
('Encargado de seguridad', 'Verifica protocolos de seguridad'),
('Apoyo administrativo', 'Gestión documental'),
('Asistente de laboratorio', 'Procesa muestras de campo'),
('Observador auxiliar', 'Apoyo general');

-- =====================================================
-- TABLA: usuarios
-- =====================================================
INSERT INTO usuarios (nombreCompleto, correo, contrasena, id_rol)
VALUES
('Ana Ramírez', 'ana@ifn.gov.co', '1234', 1),
('Luis Gómez', 'luis@ifn.gov.co', '1234', 2),
('Carlos Torres', 'carlos@ifn.gov.co', '1234', 3),
('María Pérez', 'maria@ifn.gov.co', '1234', 4),
('Andrés Mora', 'andres@ifn.gov.co', '1234', 5),
('Lucía Rojas', 'lucia@ifn.gov.co', '1234', 6),
('Pedro Díaz', 'pedro@ifn.gov.co', '1234', 7),
('Laura Castaño', 'laura@ifn.gov.co', '1234', 8),
('Juan Rivera', 'juan@ifn.gov.co', '1234', 3),
('Felipe Ochoa', 'felipe@ifn.gov.co', '1234', 4),
('Natalia Gómez', 'natalia@ifn.gov.co', '1234', 2),
('Sofía Ramírez', 'sofia@ifn.gov.co', '1234', 7),
('Camilo López', 'camilo@ifn.gov.co', '1234', 3),
('Valentina Gil', 'valentina@ifn.gov.co', '1234', 2),
('Julián Vega', 'julian@ifn.gov.co', '1234', 6),
('Manuela Ortiz', 'manuela@ifn.gov.co', '1234', 5),
('Hernán Rueda', 'hernan@ifn.gov.co', '1234', 4),
('Paola Díaz', 'paola@ifn.gov.co', '1234', 3),
('Daniel Ruiz', 'daniel@ifn.gov.co', '1234', 2),
('Carolina Méndez', 'carolina@ifn.gov.co', '1234', 1);

-- =====================================================
-- TABLA: personas
-- =====================================================
INSERT INTO personas (nombre_completo_razon_social, id_tipo_identificacion, numero_identificacion, correo, telefono, direccion, id_ciudad)
VALUES
('Ana Ramírez', 1, '10101010', 'ana@gmail.com', '3001234567', 'Cra 10 #20-30', 1),
('Luis Gómez', 1, '20202020', 'luis@gmail.com', '3019876543', 'Cl 15 #5-12', 2),
('Carlos Torres', 1, '30303030', 'carlos@gmail.com', '3025557788', 'Av 4 #33-21', 3),
('María Pérez', 1, '40404040', 'maria@gmail.com', '3034443322', 'Cl 50 #10-20', 4),
('Andrés Mora', 1, '50505050', 'andres@gmail.com', '3046661122', 'Cra 12 #9-50', 5),
('Lucía Rojas', 1, '60606060', 'lucia@gmail.com', '3051112233', 'Cl 70 #25-10', 6),
('Pedro Díaz', 1, '70707070', 'pedro@gmail.com', '3062223344', 'Av 3 #40-80', 7),
('Laura Castaño', 1, '80808080', 'laura@gmail.com', '3075556677', 'Cra 45 #70-90', 8),
('Juan Rivera', 1, '90909090', 'juan@gmail.com', '3087778899', 'Cl 20 #45-12', 9),
('Felipe Ochoa', 1, '11111111', 'felipe@gmail.com', '3098889900', 'Cra 8 #60-10', 10),
('Natalia Gómez', 1, '12121212', 'natalia@gmail.com', '3109990001', 'Cl 33 #10-30', 11),
('Sofía Ramírez', 1, '13131313', 'sofia@gmail.com', '3115552233', 'Av 5 #50-70', 12),
('Camilo López', 1, '14141414', 'camilo@gmail.com', '3126663344', 'Cra 30 #12-44', 13),
('Valentina Gil', 1, '15151515', 'valentina@gmail.com', '3137774455', 'Cl 12 #8-55', 14),
('Julián Vega', 1, '16161616', 'julian@gmail.com', '3148885566', 'Cra 15 #22-33', 15),
('Manuela Ortiz', 1, '17171717', 'manuela@gmail.com', '3159996677', 'Cl 40 #6-78', 16),
('Hernán Rueda', 1, '18181818', 'hernan@gmail.com', '3161237788', 'Av 9 #12-90', 17),
('Paola Díaz', 1, '19191919', 'paola@gmail.com', '3172348899', 'Cra 5 #4-15', 18),
('Daniel Ruiz', 1, '20212121', 'daniel@gmail.com', '3183459900', 'Cl 3 #50-11', 19),
('Carolina Méndez', 1, '21212121', 'carolina@gmail.com', '3194560011', 'Cra 45 #22-12', 20);

-- =====================================================
-- TABLA: empleados
-- =====================================================
INSERT INTO empleados (id_empleado, id_cargo_empleado)
VALUES
(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),
(11,11),(12,12),(13,13),(14,14),(15,15),(16,16),(17,17),(18,18),(19,19),(20,20);

-- =====================================================
-- TABLA: conglomerado
-- =====================================================
INSERT INTO conglomerado (codigo, latitud, longitud, altitud, fecha, observaciones)
VALUES
('C001', 4.7110, -74.0721, 2600, '2024-01-10', 'Zona boscosa Andina'),
('C002', 6.2518, -75.5636, 1500, '2024-01-12', 'Bosque húmedo'),
('C003', 3.4516, -76.5320, 1100, '2024-01-14', 'Zona con pendiente leve'),
('C004', 10.9639, -74.7964, 50, '2024-01-16', 'Zona costera'),
('C005', 8.75, -75.88, 90, '2024-01-18', 'Bosque seco tropical'),
('C006', 7.13, -73.13, 500, '2024-01-20', 'Bosque húmedo premontano'),
('C007', 4.44, -75.24, 1250, '2024-01-22', 'Zona de cafetales'),
('C008', 1.61, -75.61, 400, '2024-01-24', 'Selva baja'),
('C009', 11.24, -74.21, 100, '2024-01-26', 'Bosque seco'),
('C010', 4.08, -72.94, 300, '2024-01-28', 'Zona de sabana'),
('C011', 5.5, -73.4, 2100, '2024-01-30', 'Bosque montano'),
('C012', 6.15, -75.35, 1600, '2024-02-01', 'Zona boscosa'),
('C013', 9.3, -75.4, 120, '2024-02-03', 'Bosque seco interandino'),
('C014', 3.11, -76.49, 900, '2024-02-05', 'Zona con río cercano'),
('C015', 2.45, -76.6, 500, '2024-02-07', 'Bosque denso'),
('C016', 4.63, -74.08, 2600, '2024-02-09', 'Bosque urbano'),
('C017', 5.7, -73.1, 2000, '2024-02-11', 'Zona mixta'),
('C018', 1.21, -77.28, 2500, '2024-02-13', 'Bosque de niebla'),
('C019', 10.96, -74.8, 50, '2024-02-15', 'Zona costera'),
('C020', 4.09, -76.21, 950, '2024-02-17', 'Bosque húmedo tropical');

-- =====================================================
-- TABLA: subparcela (4 por conglomerado = 20x4)
-- =====================================================
INSERT INTO subparcela (id_conglomerado, numero_subparcela, coordenada_relativa, pendiente, tipo_cobertura, observaciones)
SELECT c.id_conglomerado, n.num, 
       CASE n.num WHEN 1 THEN 'NE' WHEN 2 THEN 'NO' WHEN 3 THEN 'SE' ELSE 'SO' END,
       ROUND(RAND()*30,2), 'Bosque mixto', 'Sin novedades'
FROM conglomerado c
JOIN (SELECT 1 AS num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) n;

select * from subparcela;
-- =====================================================
-- TABLA: muestreo_botanico
-- =====================================================
INSERT INTO muestreo_botanico (id_subparcela, fecha_muestreo, observaciones)
SELECT id_subparcela, DATE_ADD('2024-03-01', INTERVAL (id_subparcela) DAY), 'Buen estado'
FROM subparcela
LIMIT 20;

select * from muestreo_botanico;

-- =====================================================
-- TABLA: individuo
-- =====================================================
INSERT INTO individuo (id_muestreo_botanico, numero, especie, dap, altura_total, azimut, distancia, estado, categoria_dap, observaciones)
SELECT id_muestreo_botanico, id_muestreo_botanico, CONCAT('Especie_',id_muestreo_botanico), 
       ROUND(10+RAND()*30,2), ROUND(5+RAND()*15,2), ROUND(RAND()*360,2), ROUND(RAND()*20,2),
       'Vivo', 'DAP-Medio', 'Sin novedades'
FROM muestreo_botanico;
select * from individuo;

-- =====================================================
-- TABLA: muestreo_suelo
-- =====================================================
INSERT INTO muestreo_suelo (id_subparcela, profundidad_inicial, profundidad_final, textura, color_munsell, humedad, tipo_muestra, observaciones)
SELECT id_subparcela, 0, 30, 'Franco arenosa', '10YR 3/2', 'Alta', 'Compuesta', 'Sin novedades'
FROM subparcela
LIMIT 20;
select * from muestreo_suelo;

-- =====================================================
-- TABLA: muestreo_detritos_madera
-- =====================================================
INSERT INTO muestreo_detritos_madera (id_subparcela, tipo_elemento, diametro, longitud, estado_descomposicion, posicion, observaciones)
SELECT id_subparcela, 'Tronco', ROUND(RAND()*20,2), ROUND(RAND()*100,2), 'Medio', 'Horizontal', 'Ninguna observación'
FROM subparcela
LIMIT 20;
select * from muestreo_detritos_madera;

-- =====================================================
-- TABLA: equipos
-- =====================================================
INSERT INTO equipos (nombre_equipo, institucion, estado, observaciones)
VALUES
('Equipo Alfa', 'IDEAM', 'activo', 'Equipo principal'),
('Equipo Beta', 'Universidad Nacional', 'activo', 'Investigación Andes'),
('Equipo Gamma', 'MinAmbiente', 'activo', 'Zona Caribe'),
('Equipo Delta', 'Universidad de Antioquia', 'activo', 'Bosques húmedos'),
('Equipo Épsilon', 'IDEAM', 'activo', 'Zona oriental'),
('Equipo Zeta', 'Universidad del Valle', 'activo', 'Zona Pacífica'),
('Equipo Eta', 'CORPOAMAZONIA', 'activo', 'Selva amazónica'),
('Equipo Theta', 'IDEAM', 'activo', 'Zona Andina'),
('Equipo Iota', 'Universidad del Tolima', 'activo', 'Zona central'),
('Equipo Kappa', 'CAR Cundinamarca', 'activo', 'Zona centro'),
('Equipo Lambda', 'MinAmbiente', 'activo', 'Zona norte'),
('Equipo Mu', 'Universidad del Cauca', 'activo', 'Zona sur'),
('Equipo Nu', 'IDEAM', 'activo', 'Zona Sabana'),
('Equipo Xi', 'Universidad Nacional', 'activo', 'Zona llanera'),
('Equipo Omicron', 'IDEAM', 'activo', 'Zona boscosa'),
('Equipo Pi', 'Universidad del Valle', 'activo', 'Zona húmeda'),
('Equipo Rho', 'IDEAM', 'activo', 'Zona tropical'),
('Equipo Sigma', 'Universidad de Antioquia', 'activo', 'Zona árida'),
('Equipo Tau', 'IDEAM', 'activo', 'Zona mixta'),
('Equipo Upsilon', 'MinAmbiente', 'activo', 'Zona cordillerana');

-- =====================================================
-- TABLA: integrantes_equipo
-- =====================================================
INSERT INTO integrantes_equipo (id_equipo, id_empleado, id_cargo, fecha_inicio, fecha_fin, observaciones)
VALUES
(1,1,1,'2024-01-01',NULL,'Líder de equipo Alfa'),
(1,2,2,'2024-01-01',NULL,'Botánico principal'),
(1,3,3,'2024-01-01',NULL,'Técnico 1'),
(1,4,4,'2024-01-01',NULL,'Técnico 2'),
(2,5,1,'2024-01-05',NULL,'Líder Beta'),
(2,6,2,'2024-01-05',NULL,'Botánico'),
(2,7,3,'2024-01-05',NULL,'Apoyo'),
(3,8,1,'2024-01-10',NULL,'Líder Gamma'),
(3,9,2,'2024-01-10',NULL,'Botánico'),
(3,10,3,'2024-01-10',NULL,'Apoyo'),
(4,11,1,'2024-01-15',NULL,'Líder Delta'),
(4,12,2,'2024-01-15',NULL,'Botánico'),
(4,13,3,'2024-01-15',NULL,'Auxiliar'),
(5,14,1,'2024-01-20',NULL,'Líder Épsilon'),
(5,15,2,'2024-01-20',NULL,'Botánico'),
(5,16,3,'2024-01-20',NULL,'Apoyo'),
(6,17,1,'2024-01-25',NULL,'Líder Zeta'),
(6,18,2,'2024-01-25',NULL,'Botánico'),
(6,19,3,'2024-01-25',NULL,'Auxiliar'),
(6,20,4,'2024-01-25',NULL,'Chofer');

-- =====================================================
-- TABLA: asignaciones_equipos
-- =====================================================
INSERT INTO asignaciones_equipos (id_equipo, id_conglomerado, fecha_asignacion, fecha_finalizacion, estado, observaciones)
VALUES
(1,1,'2024-03-01','2024-03-10','completado','Sin novedades'),
(1,2,'2024-03-11','2024-03-20','completado','Lluvias leves'),
(2,3,'2024-03-21','2024-03-30','completado','Terreno montañoso'),
(2,4,'2024-04-01','2024-04-10','en_progreso','Pendiente de revisión'),
(3,5,'2024-04-11','2024-04-20','pendiente','Planificado'),
(3,6,'2024-04-21','2024-04-30','pendiente','Esperando permiso'),
(4,7,'2024-05-01','2024-05-10','completado','Correcto'),
(4,8,'2024-05-11','2024-05-20','completado','Buena coordinación'),
(5,9,'2024-05-21','2024-05-30','en_progreso','Muestras incompletas'),
(5,10,'2024-06-01','2024-06-10','completado','Finalizado correctamente'),
(6,11,'2024-06-11','2024-06-20','pendiente','Planificado'),
(6,12,'2024-06-21','2024-06-30','pendiente','Planificado'),
(7,13,'2024-07-01','2024-07-10','completado','Buen desempeño'),
(8,14,'2024-07-11','2024-07-20','completado','Revisión finalizada'),
(9,15,'2024-07-21','2024-07-30','en_progreso','Revisión pendiente'),
(10,16,'2024-08-01','2024-08-10','completado','OK'),
(11,17,'2024-08-11','2024-08-20','completado','OK'),
(12,18,'2024-08-21','2024-08-30','pendiente','En revisión'),
(13,19,'2024-09-01','2024-09-10','pendiente','Sin iniciar'),
(14,20,'2024-09-11','2024-09-20','pendiente','Programado');


