# BaseApp
## _Template Angular utilizando Clean Arquitecture

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Características

- El template se encuentra separado por 3 capas (Capa de Dominio, Capa de Infraestructura, Capa de presentación)
- La capa de presentación esta diseñada para usar Atomic Design


## Tecnico

Esta plantilla usa las siguientes librerías en la capa de presentación para su funcionamiento:

- [Angular](https://angular.io/docs) - Angular 11.2.3 al momento de su creación, Angular es un marco de diseño de aplicaciones y una plataforma de desarrollo para crear aplicaciones de una sola página eficientes y sofisticadas.
- [Angular Material](https://material.angular.io/) - Angular Material 11.2.12 al momento de su creación, esta librería es un kit de componentes visuales para desarrollo de UI
- [Angular Flex-Layout](https://material.angular.io/) - 12.0.0 al momento de su creación, está librearia contiene directivas angular para creación de aplicaciones responsive

## Instalación

Esta plantilla requiere para su ejecución [Node.js](https://nodejs.org/) v10+.

Instale las dependencias e inicie el servidor.

```sh
git clone ....
cd BaseApp
npm i
ng serve --o
```

Para transpilación a entorno de producción...

```sh
ng build --prod
```

## Test unitarios

Los test unitarios nos sirven para revisar componentes, servicios, etc. Y evaludar el comportamiento de la aplicación antes de su ejecución en un ambiente de producción o pruebas

Para la ejecución de las pruebas ejecute el siguiente comando sobre la ruta raiz del proyecto.

```sh
ng test
```

# Explicación plantilla

## Capa de Dominio

El dominio es el corazón de una aplicación y tiene que estar totalmente aislado de cualquier dependencia ajena a la lógica o los datos de negocio, dentro de esta capa encontramos:

- **Entidades:** Son las que encapsulan las reglas más generales y de alto nivel, son las menos propensas a cambiar cuando algo externo cambie, ningún cambio operativo debería afectar la capa de la entidad.
- **Casos de uso:** Son las reglas comerciales específicas de la aplicación, encapsula e implementa todos los casos de uso del sistema, estos casos de uso organizan el flujo de datos hacia y desde las entidades y ordenan a esas entidades sus reglas comerciales criticas, para lograr los objetivos del caso de uso, los cambios en esta capa no debe afectar las entidades ni tampoco esta capa se debe ver afectada por cambios en las extremidades como la UI o la BD, esta capa debe estar aislada, sin embargo los cambios en el funcionamiento de la aplicación si podrían afectar esta capa, si los detalles de los casos de uso cambian seguramente esta capa se vera afectada.

## Capa de Infraestructura

En esta capa se crean los controladores, presentadores y puntos de entrada, acá se encontrarán adaptadores contra BD, conexión con servicios, transformación de la data entrante y definición de endpoints, esta capa tampoco puede depender de la capa de presentación en cambio sí depende de la capa de entidad.

## Capa de Presentación

Esta es la capa de UI la cual consumirá los elementos internos de las capas internas Ej: Páginas Web y aplicaciones. 

Para este proyecto vamos a encontrar la estructura propuesta por el **Diseño Atómico**. Esta metodología es un sistema de trabajo que se basa en la creación de elementos modulares sencillos para crear estructuras de información mucho más complejas.
El modelo atómico intenta transmitir la idea de que, tanto en el diseño como en el desarrollo web, se debe trabajar desde los elementos particulares hacia los generales, creando así, todo un universo de átomos, moléculas, organismos y sistema.


### Atomos (presentation/app/atoms)

Los átomos son los elementos más básicos que podemos diseñar. Para realizar muchos de ellos nos basamos en la identidad visual que tiene o quiere tener el producto o la compañía. Ej: (Labels, Buttons, Inputs, Textos, Iconos, Imagenes)

### Moléculas (presentation/app/molecules)

Las moléculas son elementos muy simples que forman una unidad. Están compuestos por grupos de dos o más átomos y cumplen solamente una función concreta. Ej: (Cards con un conjunto de atomos como botones e iconos, etc, Input de busqueda, dialogo de alerta)

### Organismos (presentation/app/organisms)

Los organismos son componentes más complejos debido a que pueden llegar a formar secciones dentro del diseño. Estos ponen en contexto a las moléculas que hemos creado previamente. Ej: (Navbars, Footer, Header)

### Plantillas (presentation/app/templates)

Las plantillas son la estructura que la página o pantalla a diseñar va a tener. Definiremos las guías maestras en las que se asentará el contenido y estableceremos cómo va a ser la disposición de los organismos ya creados en la retícula que vamos a utilizar, ***pero sin la data real***. Ej: (Login, Página de perfil)

### Paginas (presentation/app/pages)

Las páginas o pantallas son el entregable final, la representación diseñada de toda la interfaz del producto. ***Son los templates con la data real.***, **Si el proyecto es modular y se requiere un router por modulo, cada uno de estos módulos creados deben ir dentro de esta carpeta y deben importarse al modulo principal. Ej:

presentation/app/pages/modules/user
- components (directorio)
- user.module.ts
- user-routing.module.ts

presentation/app/pages/modules/product
- components (directorio)
- product.module.ts
- product-routing.module.ts

### Carpeta compartida (presentation/shared)

Esta carpeta contiene los componentes genéricos, módulos, interceptores, interfaces, guards, servicios, etc. Todo lo que sea compartido entre módulos y componentes

# Nombrado y convenciones

- Los nombres para los componentes, servicios, enums, etc. En el archivo se deben nombrar en minuscula aunque internamente el nombre del elemento contenga algún tipo de uso nomenclatura como CamelCase Ej: **user.component.ts** (Nombre del archivo), **UserComponent** (Nombre interno en la clase).
- Si los nombres son largos se deben separar con - Ej: **user-use-case.service.ts**
- Los elementos creados en el arbol del Atomic Design deben llevar el nombre al final de lo que este es considerado. Ej: **button-*atom*.component.ts**
- Aunque el CLI al momento de crear los componentes les adiciona la palabra app al selector en el decorador @Component, este debe mantener el nombre del elemento Ej **(Solo para los elementos de arbol de Atomic Design)**:

    ```js
    @Component({
        selector: 'button-atom', //Por defecto es app-button-atom
        templateUrl: './button-atom.component.html',
        styleUrls: ['./button-atom.component.css']
    })
    ```
- Nombrado de clases *(UpperCamelCase)*
- Nombrado de funciones y variables *(lowerCamelCase)*


# Ventajas de la arquitectura y el diseño atómico

-**Generar un lenguaje ubicuo:** Tanto el equipo de desarrollo como el de negocio entiende el mismo lenguaje, pues se hablan desde los mismos términos, las entidades y casos de uso las define el negocio no el desarrollador, esto permite que cuando existan problemas en una parte de la solución o se requieran nuevas implementaciones todos tengan claro donde se va a impactar.
-**Independencia de marcos:** La arquitectura no depende de la existencia de alguna librería, biblioteca o plugin, no importa el lenguaje de programación que estemos utilizando podemos aplicar estos principios.
-**Es probable:** Las reglas de negocio se pueden probar sin la necesidad de una interfaz gráfica de usuario, la BD, el servidor web o cualquier otro elemento externo.
-**Independencia a la UI:** Se podría usar cualquier marco de trabajo, o librería visual, pero eso no va a cambiar las reglas de negocio.
-**Independencia de conexión:** Permite conectarse a cualquier tipo de web service o sistema de persistencia, local o remota, ya que las reglas comerciales no están vinculadas a algún componente o tecnología.
-**Atomic Design:** El diseño del producto, al ser trabajado de esta manera, es más coherente y ofrece así al usuario una experiencia consistente. Podemos definir el mismo componente para que sea utilizado de esa manera en todos los dispositivos o plataformas en los que el producto se desarrolle.
La creación de menos componentes implica que el tiempo de diseño y desarrollo sea más corto. Por ejemplo, se pueden reutilizar muchos de los átomos ya creados y combinarlos para obtener nuevas moléculas. Este proceso que va de lo abstracto a lo concreto. Esto es perfecto porque trabajar y validar componentes abstractos hace que la iteración reduzca el coste de tiempo.

Permite crear un inventario de todos los componentes creados. Así se puede hacer rápidamente una auditoría y tener controlados todos ellos.

Todos los elementos básicos quedan jerarquizados en las fases iniciales para facilitar posteriormente las iteraciones. Tets

Una vez tenemos definida la plantilla, la creación de páginas se hace de forma mucho más rápida.
