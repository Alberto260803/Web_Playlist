## 🎵 Music Royale

Este proyecto es una aplicación web simple construida con **React** que simula un torneo musical para determinar qué año (o qué playlist) es el **mejor musicalmente**, basándose en la votación del usuario.

Nació como una herramienta personal para enfrentar los **"Recaps" musicales de YouTube Music** de distintos años. A pesar de que estos recaps originalmente contienen **100 canciones**, es común que, debido a vídeos no disponibles o privados, la **API de YouTube** solo pueda leer un número reducido de ellas. Es por ello que algunas playlists han sido ajustadas.

---

### ✨ Funcionalidad Actual (MVP)

La aplicación implementa la lógica central del torneo, enfrentando un conjunto fijo de cuatro playlists, que inicialmente corresponden a los años: **2022, 2023, 2024 y 2025**.

* **Carga Rápida de Recaps:** Incluye un **botón** para cargar mis playlists predefinidas (mis Recaps), evitando tener que pegar las URLs manualmente.
* **Enfrentamiento Posicional:** El torneo se basa en la **posición** dentro de la playlist. Las playlists con más canciones (o menos "errores" en el Recap original) tienen más enfrentamientos. Por ejemplo, si la playlist más larga tiene 96 canciones, el torneo comenzará en la posición 96. El resto de playlists participan a partir de las posiciones en las que tienen canciones disponibles.
* **Mecanismo de Votación:** El usuario vota por la canción (y, por extensión, la playlist del año) que considera "mejor" en cada enfrentamiento posicional.
* **Determinación del Ganador:** Al finalizar la votación, se muestra el año (playlist) ganador.
* **Desempate Inteligente:** Si dos o más años (playlists) terminan empatados en la final, la aplicación elige una **canción aleatoria** de las playlists empatadas. El usuario debe elegir qué canción le gusta más, y esta decisión final resuelve el empate.

---

### 🚀 Uso y Configuración Local

Para que la aplicación funcione correctamente, es **imprescindible** obtener y configurar una clave de la API de YouTube.

#### 1. Obtener la API Key

1.  Dirígete a la **Google Cloud Console**.
2.  Crea un nuevo proyecto y habilita la **YouTube Data API v3**.
3.  Genera una **API Key** para tu proyecto.

#### 2. Configurar la Aplicación

1.  Clona este repositorio.
2.  Crea un fichero de variables de entorno (.env) y pon tu API Key:

    ```javascript
    VITE_YOUTUBE_API_KEY="TU_API_KEY" // Sustituye por tu API key.
    ```

#### 3. Ejecutar el Proyecto

Instala las dependencias y ejecuta la aplicación:

```bash
npm install
npm run dev
```

---

### 🚧 Potencial y Desarrollo Futuro

El objetivo de este proyecto es ser la base de una herramienta de comparación de playlists totalmente flexible y comunitaria. Las siguientes características están planeadas para futuras iteraciones:

* **Gestión de Configuraciones (UX):** Crear una pantalla u opción que permita al usuario **guardar una configuración** de playlists para no tener que copiar y pegar URLs a cada rato.
* **Comunidad de Torneos:** Permitir que los usuarios **suban sus configuraciones** de playlists para que otros usuarios las carguen y hagan el torneo creado por la comunidad.
* **Número de Playlists Flexible:** Permitir al usuario introducir **cualquier número** de playlists (2, 3, 5 o más) sin limitarse a las cuatro actuales.
* **Selección de playlist dinámica:** Desvincular el torneo de los años 2022-2025 predefinidos, permitiendo la comparación de **cualquier año o tema** que el usuario defina.
* **Estructura de Torneo Personalizable:**
    * **Eliminación por Posición:** Mantener la lógica actual de enfrentamiento posicional.
    * **Enfrentamiento Aleatorio:** Implementar un modo de torneo donde los enfrentamientos iniciales y la estructura sean **totalmente aleatorios**, y el usuario pueda elegir cuántas rondas de enfrentamiento quiere generar.

---

### 🛠️ Tecnología

* **Frontend:** React
* **API:** YouTube Data API v3
* **Estilos:** CSS

**Este es un proyecto en desarrollo. El código actual implementa la funcionalidad básica esperada, y está previsto seguir añadiendo características en el futuro.**
