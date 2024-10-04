# Planeación del desarrollo orientado a la App Móvil

## Objetivos y Alcance del Proyecto

### Objetivos
Desarrollar una aplicación móvil para proporcionar a los usuarios una plataforma integral que les permita, a través de una cuenta personal, contratar servicios de ambulancia de manera rápida y eficiente, gestionar el registro de citas médicas y realizar donaciones para apoyar causas humanitarias, todo en un entorno accesible, seguro y conveniente. Estas funcionalidades mejorarán la interacción de los usuarios con los servicios esenciales y facilitarán un canal para apoyar causas importantes para la empresa Cruz Roja.

### Alcance
El alcance de la aplicación móvil incluye el desarrollo de una plataforma que permita a los usuarios, mediante la creación de una cuenta, acceder a diversas funcionalidades clave: la contratación de servicios de ambulancia en tiempo real, el registro y gestión de citas médicas, y la posibilidad de realizar donaciones a causas relacionadas con servicios de salud. La aplicación integrará sistemas de notificaciones para recordar citas y confirmar servicios. Además, incluirá un sistema de perfiles de usuario donde podrán consultar el historial de servicios contratados y citas agendadas.

## Equipo de Trabajo y Roles

El equipo de trabajo está conformado por los siguientes integrantes:

- Ángel Josué Hernández Manuel – Líder del proyecto, Desarrollador y Documentador
- Agustina Hernández Martínez – Líder del proyecto, Desarrollador y Documentador
- Juan Carlos Cifuentes Cruz – Líder del proyecto, Desarrollador y Documentador

## Plazos y Entregas
Los plazos y entregables fueron planificados de septiembre a noviembre, considerando un periodo de 4 semanas por mes. Se trabaja bajo la metodología ágil Scrum, y todos los entregables fueron planificados mediante un diagrama de Gantt.

  ![Gant](https://angelcosas.s3.us-east-2.amazonaws.com/Imagen+de+WhatsApp+2024-10-04+a+las+11.30.37_09c54cac.jpg)

## Riesgos Identificados y Medidas para Mitigarlos

### 1. Falta de Claridad en los Objetivos
No tener claridad en los objetivos y el alcance del proyecto podría causar malos entendidos dentro del equipo y una mala ejecución de las actividades.

- **Medida de mitigación**:
o       Realizar reuniones con el equipo para definir y acordar los objetivos y alcances.
o	Crear un documento de definición de objetivos y alcances que sea accesible y aprobado por todos los miembros clave del proyecto. Este documento debe incluir metas claras, los entregables esperados y criterios de éxito.
o	Implementar un proceso formal de control de cambios para cualquier ajuste en los objetivos o alcances. Los cambios deben ser documentados y aprobados por las partes interesadas clave.


### 2. Retrasos en las Entregas
Retrasos en la entrega de las actividades asignadas debido a tareas complejas.

- **Medida de mitigación**:
  
o	Dividir las tareas complejas en subtareas más pequeñas y manejables, lo que permite identificar posibles cuellos de botella y asignar recursos de manera más efectiva.
o	Asegurarse de que las tareas más complejas sean asignadas a los miembros del equipo con mayor experiencia y conocimientos técnicos en esas áreas.
o	Establecer revisiones frecuentes del avance de las tareas técnicas, para detectar cualquier retraso temprano y ajustarlo.


### 3. Falta de Comunicación
Una comunicación inefectiva entre los miembros del equipo puede llevar a malentendidos durante el desarrollo.

- **Medida de mitigación**:

o	Implementar una matriz de roles y responsabilidades para que todos los miembros del equipo sepan quién es responsable de qué, a quién deben acudir para resolver dudas y quién debe ser informado de los avances o problemas.
o	Definir las herramientas oficiales de comunicación para garantizar que todos los miembros del equipo utilicen los mismos canales.


### 4. Rendimiento y Escalabilidad
La aplicación podría no ser capaz de manejar un aumento de usuarios o carga de trabajo, afectando su rendimiento.

- **Medida de mitigación**: Realizar pruebas de rendimiento, optimizar los recursos y utilizar microservicios y balanceo de carga.

### 5. Protección y Seguridad de Datos
Vulnerabilidades en la seguridad de los datos pueden exponer información confidencial.

- **Medida de mitigación**: Implementar cifrado (SSL/TLS y AES) y autenticación multifactor (MFA).
  
### 6. Integración con el Sitio Web
Integración inadecuada entre la aplicación móvil y el sitio web puede llevar a incoherencias en la información, problemas de sincronización de datos.

- **Medida de mitigación**:
- 
o	Realizar pruebas automatizadas y de compatibilidad para asegurar que la aplicación y el sitio web funcionen correctamente juntos.
o	Implementar herramientas de monitoreo y mantener logs de errores para detectar y corregir fallos rápidamente.





### 7.Experiencia de usuario
Mala experiencia de usuario puede causar que los usuarios abandonen la aplicación, reduzcan el uso o generen malas críticas, afectando el éxito del producto.

- **Medida de mitigación**:
o	Realizar pruebas con usuarios reales y crear prototipos para validar la experiencia de usuario antes de la implementación final.
o	Implementar un diseño accesible y responsive, asegurando que sea intuitivo y fácil de usar en cualquier dispositivo.
o	Reducir los tiempos de carga y usar animaciones para mejorar la interacción del usuario.

###	Estrategias de comunicación 

•	Canales de comunicación: Sesión en meet para la comunicación diaria y a discusión rápida de problemas. Establecer un proceso claro para la resolución de conflictos. Por ejemplo, en caso de un malentendido técnico, se podrían organizar sesiones de aclaración en las que todos los miembros participen y expongan sus puntos de vista para llegar a una solución.
•	Utilizar la herramienta de Trello o cualquier herramienta de gestión de tareas para asignar, priorizar y hacer el seguimiento del estado de cada tarea.
•	Utilizar un sistema de control de versiones como Git con ramas específicas para las plataformas si se requiere personalización por plataforma. Asegurarse de que las integraciones se realicen cuidadosamente y sean revisadas por miembros clave del equipo.



## Metodología Ágil de Desarrollo: Scrum

La metodología ágil seleccionada es Scrum, la cual permite obtener resultados rápidos en entornos cambiantes y mantiene un marco de trabajo colaborativo. Las fases incluyen:

1. **Planificación**: Se establecerán las tareas prioritarias del proyecto, los objetivos y la lista del Product Backlog. Las prioridades se basarán en el valor de cada entregable.
2. **Ejecución del Sprint**: El equipo trabajará en los elementos seleccionados del Sprint, desarrollando los diseños y funcionalidades.
3. **Revisión del Sprint**: Se revisará el trabajo completado y se verificará que cumpla con los criterios de aceptación.
4. **Retrospectiva del Sprint**: Se analizarán las áreas de mejora y los aspectos que funcionaron bien durante el Sprint.

Scrum divide el trabajo en ciclos cortos llamados sprints, que duran de 1 a 4 semanas. Al final de cada sprint, se realiza una revisión del producto y una retrospectiva para mejorar continuamente.

## Pila Tecnológica

Para el desarrollo de la aplicación se eligió la pila MERN STACK, como se muestra en la siguiente tabla:

- **Capa de Presentación**:
- React Native
  ![React Native](https://www.workiy.com/sites/default/files/inline-images/514-5142665_react-native-transparent-react-native-logo-png-png.png )
  
  ![Tailwindcss](https://cdn.worldvectorlogo.com/logos/tailwind-css-1-2.svg)
  
  ![.](https://repository-images.githubusercontent.com/180328715/fca49300-e7f1-11ea-9f51-cfd949b31560)
  
- **Capa de Negocio**:
- Node.js
![a.](https://www.google.com/imgres?q=node%20js&imgurl=https%3A%2F%2Fwww.muylinux.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fnodejs.png&imgrefurl=https%3A%2F%2Fwww.muylinux.com%2F2022%2F04%2F27%2Fnodejs-18%2F&docid=Gkm0dcMeylemdM&tbnid=0cR72ir89_N2EM&vet=12ahUKEwjt3o21q_WIAxW-78kDHV_RNA8QM3oFCIIBEAA..i&w=1200&h=720&hcb=2&ved=2ahUKEwjt3o21q_WIAxW-78kDHV_RNA8QM3oFCIIBEAA)

![c.](https://kinsta.com/es/base-de-conocimiento/que-es-express/)

![d.](https://docs.abstractapi.com/company-enrichment)

![d.](https://community.nodemailer.com/)

- **Capa de Datos**:
  
![dv.](https://www.google.com/imgres?q=sql%20server&imgurl=https%3A%2F%2Fitsoftware.com.co%2Fcontent%2Fwp-content%2Fuploads%2F2023%2F07%2FSQL-Server-1.png&imgrefurl=https%3A%2F%2Fitsoftware.com.co%2Fcontent%2Fque-es-sql-server-su-historia-ventajas-y-beneficios%2F&docid=BOcz82Pvovv3AM&tbnid=8jxNLNtTwqyn7M&vet=12ahUKEwjR8_v9q_WIAxWnMdAFHUv-EvwQM3oECBUQAA..i&w=600&h=448&hcb=2&ved=2ahUKEwjR8_v9q_WIAxWnMdAFHUv-EvwQM3oECBUQAA)

![vds.](https://www.crv.com/companies/vercel)

![sd.]([https://community.nodemailer.com/](https://unaaldia.hispasec.com/2019/08/acceso-no-autorizado-a-datos-de-al-menos-14-millones-de-clientes-de-hostinger.html))

## 9 Issue Tracking y Asignación de Issue
- **9.1	Herramienta de planeación**
La herramienta elegida para la asignación de actividades en la planificación es ClickUp, en la cual se integraron los miembros del equipo, así como los docentes a revisar los entregables.

## 10 Selección de herramienta de control de versiones
Para el manejo de versionamiento se eligió GitHub. 

Consideramos que dentro del desarrollo del proyecto el control de versiones es esencial para asegurar el trabajo colaborativo y poder trabajar en diferentes funcionalidades sin riesgo de sobrescribir el trabajo de otros. Esta herramienta nos permitirá registrar y revisar cada cambio hecho en el código, con la posibilidad de volver a versiones anteriores si surge algún problema. Esto proporciona un entorno más seguro y organizado para el desarrollo. Al desarrollar la aplicación, los integrantes del equipo podremos trabajar en distintas características o resolver bugs de manera simultánea sin afectar el código principal (branch main o master). Los pull requests permiten revisar el código de manera colaborativa antes de integrarlo al proyecto principal, lo que ayuda a garantizar la calidad y a mantener la coherencia en el estilo de codificación. GitHub se integra fácilmente con plataformas de Integración Continua y Entrega Continua (CI/CD). Estas integraciones permiten ejecutar automáticamente pruebas unitarias, de integración y de interfaz de usuario cada vez que se realiza un cambio en el código. Además, GitHub permite automatizar el proceso de generación. GitHub permite una gestión avanzada de ramas, lo que facilita a los equipos trabajar en diferentes funcionalidades, mejoras o correcciones de errores sin afectar el código principal hasta que todo esté probado y listo para ser fusionado. GitHub ofrece una forma organizada de gestionar estas ramas, permitiendo que los desarrolladores trabajen en distintas características o correcciones de forma simultánea sin interferencias, hasta que los cambios estén listos para ser integrados en la rama principal. Facilita la automatización de pruebas y despliegue, lo cual es crucial para asegurar la calidad continua en un entorno de desarrollo rápido como el de React Native.


GitHub permite la colaboración y revisión del código entre los miembros del equipo y asi poder realizar cambios, corrección de errores y agregar modificaciones en caso de que sea necesario para el proyecto. 

## 11	Selección de estrategia de versionamiento
Para el desarrollo de nuestra aplicación móvil, hemos optado por utilizar un flujo de trabajo centralizado para el control de versiones. Esta estrategia se adapta perfectamente a las necesidades de un equipo pequeño como el nuestro, compuesto por tres integrantes.

El flujo de trabajo centralizado se basa en el uso de un único repositorio central donde la rama principal (main) contiene siempre la versión estable del código. Todos los desarrolladores realizan cambios directamente en esta rama, asegurando que:

•	El código siempre esté listo para ser desplegado en producción.
•	La simplicidad del flujo de trabajo facilita la colaboración directa entre los miembros del equipo, sin la necesidad de gestionar múltiples ramas o flujos complejos.

Además, esta estrategia nos permite mantener un control claro sobre los cambios en el proyecto, evitando la complejidad que puede surgir con el uso de múltiples ramas. Como herramienta de control de versiones, utilizaremos GitHub, el cual ofrece una plataforma robusta para la colaboración en tiempo real, la revisión de código y la integración continua (CI) mediante flujos de trabajo automatizados para ejecutar pruebas y asegurar la calidad del código.

 ## 12 Creación, revisión y fusión de ramas. 
Por el tipo de estrategia de versionamiento seleccionado el equipo de desarrollo trabaja única rama central del repositorio, generalmente llamada "main" o "master".

- **12.1 Creación de la rama**
  
Cuando un miembro del equipo necesita trabajar en una nueva funcionalidad o corrección de errores, se debe crear una nueva rama basada en la rama central (main/master) para aislar los cambios. Para ello se debe asegurar de estar en la última versión de la rama central (main o master) y de que el código esté actualizado.

	
	    git clone https://github.com/tu-repositorio.git
	
	
	    git pull origin main
	


•	Crear una nueva rama: Crear una nueva rama para la tarea específica. El nombre de la rama debe ser descriptivo y reflejar la tarea que se esté realizando.

	
	   git checkout -b feature/nueva-funcionalidad
	

•	Realizar todos los cambios necesarios en la nueva rama, asegurándose de que no afecten la estabilidad del proyecto en la rama principal. A medida del avance, se realizan commits regulares con mensajes claros y descriptivos sobre los cambios realizados.


	   git add .
           commit -m "Descripción clara del cambio realizado"
	


•	Revisión de la rama:

Antes de fusionar los cambios en la rama central, la rama debe ser revisada para asegurar que cumple con los requisitos del proyecto y no introduce errores. Una vez que hayas terminado de trabajar en la nueva funcionalidad, sube tu rama al repositorio remoto para que otros puedan revisarla.


	   git push origin feature/nueva-funcionalidad
	

Abrir una solicitud de revisión (Pull Request): En la plataforma de control de versiones que es GitHub se crea una Pull Request (PR) desde la rama nueva hacia la rama central (main o master).

•	Fusión de ramas: 
Una vez que la revisión ha sido aprobada y no hay más correcciones pendientes, se fusiona la rama al repositorio central. Antes de fusionar, asegurarse de estar en la última versión de la rama central y luego fusiona tu rama.

	
	   git checkout main
	   git pull origin main
	   git merge feature/nueva-funcionalidad
	

## 12.2 Estrategia contempla la integración continua CI
Este tipo de estrategia si contempla la integración continua, ya que una estrategia de versionamiento centralizado, la rama principal (normalmente main o master) es el único lugar donde se realiza la integración continua de código. Los desarrolladores crean ramas temporales para desarrollar nuevas funcionalidades o correcciones, pero todos los cambios se integran de nuevo en la rama principal una vez revisados. La Integración Continua en el contexto del versionamiento centralizado se centra en garantizar que la rama principal siempre esté en un estado estable. Esto significa que cada vez que se fusionan ramas de características o correcciones a la rama principal, se deben realizar pruebas automatizadas para asegurarse de que la aplicación no se rompa. Para garantizar la calidad del código que se fusiona en la rama central, es crucial utilizar un flujo de Pull Requests (PR) donde otros miembros del equipo revisan el código antes de ser fusionado. 

## 13.	Estrategia de despliegue 
Para el despliegue de la aplicación móvil, implementaremos la estrategia Canary, con el objetivo de reducir riesgos al momento de lanzar nuevas versiones del software. Con esta estrategia, se despliega la nueva versión a un subconjunto limitado de usuarios antes de hacerlo disponible para todos. Esto nos permitirá:

•	Minimizar riesgos: La versión nueva es probada por un pequeño grupo de usuarios, lo que nos permite identificar posibles errores sin afectar a toda la base de usuarios.
•	Recoger feedback temprano: El comportamiento de la nueva versión puede monitorearse en tiempo real, permitiendo ajustes rápidos y efectivos.
•	Rollback fácil: Si se detectan problemas, se puede revertir a la versión anterior de manera sencilla, minimizando el impacto en la experiencia del usuario.

Esta estrategia es especialmente útil en proyectos de aplicaciones móviles, donde la experiencia del usuario es crítica. Requiere un monitoreo continuo del rendimiento y el comportamiento del sistema, para lo cual utilizaremos herramientas de monitoreo como Prometheus y Grafana si es necesario a medida que el proyecto crezca. Con el despliegue Canary, garantizamos que el servicio siga funcionando correctamente, mientras introducimos mejoras y nuevas funcionalidades de manera controlada.

## 14.	Entornos de desarrollo
Para las herramientas seleccionadas en el entorno de desarrollo son las siguientes:
•	Planificación
Se eligió la herramienta de ClickUp usado para la gestión de las actividades definidas para el desarrollo del proyecto en donde nos permite organizar y planificar el trabajo del equipo de desarrollo. De igual manera nos permite crear y asignar tareas, fijar fechas límite y realizar un seguimiento del progreso del proyecto. Algunas de sus funcionalidades clave incluyen.
•	Control de versiones:
Para el control de versiones se eligió trabajar con la herramienta de Git + GitHub.
El cual, con la ayuda del alojamiento de nuestro repositorio en GitHub, nos permite llevar un seguimiento sobre los cambios, correcciones de la aplicación desarrollada y de esta manera poder gestionar las revisiones mediante el pull request y las ramas. 
•	Entorno de desarrollo:

Para la herramienta del entorno del desarrollo se trabajará en Visual Studio Code. 
Es un editor de código muy popular, especialmente para lenguajes como JavaScript y TypeScript, que son esenciales en tecnologías como React Native (para desarrollo móvil) y Node.js (para backend). Algunas de las razones por las que fue elegida la herramienta son las siguientes: 

	Extensiones: Permite añadir extensiones para mejorar la productividad, como soporte adicional para JavaScript/TypeScript, linting, depuración de código y herramientas de control de versiones como Git.

	Depuración integrada: VSCode permite depurar el código directamente desde el editor, lo que facilita identificar y corregir errores durante el desarrollo.

	Soporte para React Native y Node.js: Ofrece un excelente soporte para estas tecnologías, proporcionando una integración fluida con frameworks y bibliotecas usadas en el desarrollo móvil y backend.

Staging

Expo: Esta herramienta nos facilita el desarrollo y prueba de aplicaciones móviles en React Native. En esta fase de staging (preproducción), Expo se utiliza para probar la aplicación en dispositivos reales o simuladores, permitiendo a los desarrolladores ver cómo se comporta la app en un entorno similar al de producción.

Producción

Para la parte de producción la herramienta seleccionada es Hostinger.

El cual esta herramienta es un proveedor de servicios de hosting que nos permitirá desplegar el backend en un entorno de producción. En esta fase, el backend está disponible para usuarios reales y es accesible en internet.

## 15.	Como clonar un repositorio 
Para poder realizar la clonación del repositorio lo primero que se debe contemplar es tener instalado la herramienta de Git. Una vez que se tenga la herramienta instalada, se debe abrir la línea se comando o consola de nuestro equipo de computo y ejecutar el siguiente comando: 

	
	 git clone (URL_DEL_REPOSITORIO)
	

Y posteriormente navegar hacia el directorio para verificar que el proyecto se haya creado. 

## 16.	Instalar dependencias
Para poder realizar la instalación de las dependencias debemos navegar hacia el directorio en donde se encuentra el proyecto, desde la terminal y una vez ahí adentro ejecutamos el siguiente comando: 

	
	npm install
	

## 17.	Ejecutar el proyecto
Para la ejecución del proyecto, de igual manera estando en la terminar se ejecuta el comando: 

	
	expo start
	

Esto abrir o bueno nos proporcionara un código QR. Y escanear ese código para poder abrir la aplicación, un punto muy importante, debemos de tener una aplicación instalada en nuestro aparato móvil que se llama Expo Go.
