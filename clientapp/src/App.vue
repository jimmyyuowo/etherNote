<template>
  <div id="app">
    <nav>
      <router-link to="/note">Note</router-link> |
      <router-link to="/chat">Chat</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>