<template>
  <div class="app-layout">
    <!-- 1. Barra de Navegación Superior (Navbar) -->
    <header class="navbar">
      <div class="brand">Iam Directory System</div>
      <div class="user-menu">
        <span v-if="authStore.user">Hola, {{ authStore.user.name }}</span>
        <button @click="handleLogout" class="logout-button">Cerrar Sesión</button>
      </div>
    </header>

    <div class="main-content-wrapper">
      <!-- 2. Barra Lateral (Sidebar) -->
      <aside class="sidebar">
        <nav>
          <ul>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
          </ul>
        </nav>
      </aside>

      <!-- 3. Área de Contenido Principal -->
      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
</script>

<style scoped>

.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f6f8;
  width: 100%;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  flex-shrink: 0;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-menu span {
  margin-right: 1rem;
  color: #333;
}

.logout-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.logout-button:hover {
  background: #c82333;
}

.main-content-wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  background-color: #343a40;
  color: #160505;
  padding-top: 1rem;
  flex-shrink: 0;
  overflow-y: auto;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav li a {
  display: block;
  padding: 1rem 1.5rem;
  color: #c2c7d0;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.sidebar nav li a:hover {
  background-color: #495057;
  color: #fff;
}

.sidebar nav li a.router-link-exact-active {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
}

.content-area {
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
  color: #333;
}
</style>