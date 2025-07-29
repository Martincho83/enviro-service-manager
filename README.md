# Sistema de Gestión de Tickets de Soporte (HelpDesk System)

Este es un proyecto full-stack que simula un sistema interno de Help Desk, diseñado para demostrar habilidades avanzadas en el desarrollo de aplicaciones web, incluyendo la gestión de flujos de trabajo (workflows), roles de usuario y comunicación en tiempo real. La aplicación permite a los empleados crear tickets de soporte y al personal de TI gestionarlos hasta su resolución.

## 🌟 Capturas de Pantalla


| Vista de Tickets (Empleado) | Formulario de Creación | Vista de Tickets (Admin) |
| :---: | :---: | :---: |
| ![Vista de Empleado](https://github.com/user-attachments/assets/c6f40684-0e76-4c60-8d2a-f28be8c8bd69) | ![Formulario de Creación](https://github.com/user-attachments/assets/cc897723-9c58-45ef-aec9-c799ac9c3479) | ![Vista de Admin](https://github.com/user-attachments/assets/cb567440-ae58-49c8-bbbb-f050faf3a54c) |

| Vista de Detalle del Ticket | Controles de Admin | Conversación de Comentarios |
| :---: | :---: | :---: |
| ![Vista de Detalle](https://github.com/user-attachments/assets/7087e8d1-e716-4327-9070-bb5a222c1b0f) | ![Controles de Admin](https://github.com/user-attachments/assets/3e69bf4c-3300-4edc-8f08-d24a0309bc0c) | ![Conversación](https://github.com/user-attachments/assets/0857bbae-2d85-45fc-911a-75c43dd21f1c) |

## ✨ Funcionalidades Principales

### Rol de Empleado (Usuario)
- **Creación de Tickets:** Formulario intuitivo para reportar problemas, especificando título, descripción y categoría.
- **Seguimiento Personal:** Visualización de una lista personal con todos los tickets creados y su estado actual.
- **Comunicación Directa:** Ver el detalle de un ticket, leer los comentarios del equipo de soporte y añadir respuestas o información adicional.

### Rol de Administrador (Soporte de TI)
- **Dashboard Centralizado:** Vista de todos los tickets del sistema con capacidad de filtrado y ordenamiento.
- **Gestión del Ciclo de Vida del Ticket:**
  - **Asignación:** Asignar tickets a sí mismo o a otros administradores para distribuir la carga de trabajo.
  - **Cambio de Estado:** Actualizar el estado de un ticket a medida que avanza en el flujo de resolución (Abierto, En Progreso, Resuelto, etc.).
- **Interacción y Registro:** Añadir comentarios públicos para el usuario y ver el historial completo de la conversación.

## 🛠️ Stack Tecnológico

El stack es consistente con las mejores prácticas modernas de desarrollo web:

### Backend
- **Node.js** con **Express.js** para una API RESTful robusta.
- **Sequelize** como ORM para mapear objetos a una base de datos **PostgreSQL**.
- **JSON Web Tokens (JWT)** y middlewares personalizados para un sistema de autenticación y autorización basado en roles.
- **bcryptjs** para el hasheo seguro de contraseñas de usuario.

### Frontend
- **Vue.js 3** utilizando la **Composition API** y la sintaxis `<script setup>`.
- **Vue Router** para gestionar la navegación del lado del cliente, incluyendo rutas anidadas y guardias de navegación para proteger las vistas.
- **Pinia** para una gestión de estado global, reactiva y centralizada (manejo de sesión de usuario, roles, etc.).
- **Axios** para consumir la API del backend de forma segura y eficiente.

### DevOps y Herramientas
- **Docker** y **Docker Compose** para la contenerización completa y orquestación de los tres servicios (frontend, backend, db), garantizando un entorno de desarrollo consistente y listo para producción.
- **Nginx** sirviendo la aplicación Vue compilada en un contenedor optimizado y ligero.
- **ESLint** y **Prettier** para mantener la calidad y el estilo del código.

## 🚀 Cómo Empezar (Ejecutar con Docker)

Este proyecto está diseñado para ser ejecutado fácilmente con Docker.

### Prerrequisitos
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose.

### Pasos de Instalación
1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/helpdesk-system.git
    cd helpdesk-system
    ```

2.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto, copiando el contenido de `.env.example` o usando la siguiente plantilla:
    ```env
    DB_DATABASE=helpdesk_db
    DB_USERNAME=admin
    DB_PASSWORD=secretpassword123
    JWT_SECRET=tu_frase_secreta_super_segura_para_el_helpdesk
    ```

3.  **Levanta la aplicación:**
    Este comando construirá las imágenes, creará la base de datos y levantará los servicios.
    ```bash
    docker compose up --build
    ```
    *Nota: Si prefieres ejecutarlo en segundo plano, usa `docker compose up --build -d`.*

4.  **Ejecuta las migraciones y los datos iniciales (seeders):**
    En una **segunda terminal**, ejecuta estos comandos para inicializar la base de datos:
    ```bash
    # Ejecutar migraciones para crear las tablas
    docker compose exec backend npx sequelize-cli db:migrate

    # Ejecutar seeders para poblar datos iniciales (categorías y estados)
    docker compose exec backend npx sequelize-cli db:seed:all
    ```

5.  **¡Accede a la aplicación!**
    - **Frontend:** `http://localhost:5174`
    - **Backend API:** `http://localhost:8081`

## 📝 Endpoints de la API (Resumen)

<details>
<summary><strong>Haz clic para ver los endpoints de la API</strong></summary>

- **Auth**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- **Tickets**
  - `POST /api/tickets` (Crear)
  - `GET /api/tickets` (Listar)
  - `GET /api/tickets/:id` (Detalle)
  - `PUT /api/tickets/:id` (Actualizar estado/asignado - Admin)
- **Comments**
  - `POST /api/tickets/:id/comments` (Añadir comentario)
- **Data**
  - `GET /api/data/ticket-categories`
  - `GET /api/data/ticket-statuses`
  - `GET /api/data/admins` (Admin)

</details>

---
*Desarrollado por [Martin Alejandro Lamas](https://github.com/Martincho83)*