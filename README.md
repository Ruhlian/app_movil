Se subio al repostorio el proyecto de la aplicacion movil
Esta app almacena datos y lee datos por el momento, ya que solo se solicito por parte del instructor, la app
tiene un 20% de desarrollo



##################################
Paso a paso para instalar la app desde el ordenador
(solo descargar la carpeta src y los archivos)

Crear una carpeta y abrirla en VS

npm install -g expo-cli

luego ejecutar en la terminal en VS

npx create-expo-app Entquim

lo siguiente

cd Entquim

se instalan el otros paquetes

npm install react react-dom

npm install axios

npm install -g json-server

npm install @react-navigation/native @react-navigation/stack @react-native-community/viewpager react-native-screens react-native-safe-area-context

npm install react-native-vector-icons

npm install @expo/vector-icons

npm install react-native-modal


ejecutar este comando si hay vulnerabilidades

npm audit fix

Importante descargar los archivos modificados y creados cuando lleven un seguimiento al drive, seleccionar la logica y pegar a la carpeta que se hizo en el escritorio
despues de hacer las pruebas subir al repositorio

Por ultimo ejecutar primero en una terminal 

npm run start:db

luego en otra ejecutar

npm start 

y listo, eso seria todo por el momento


Detalles para anexar

SafeAreView
SafeAreaView es un componente de React Native que asegura que el contenido se ajuste dentro de las áreas visibles de la pantalla, 
evitando superposiciones con la barra de estado, la barra de navegación y otros elementos del sistema.
