import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import LevelSelectionPage from '../pages/LevelSelectionPage.vue'
import GamePage from '../pages/GamePage.vue'
import RankingPage from '../pages/RankingPage.vue'

const routes = [
    { path: '/', component: MainPage },
    { path: '/level', component: LevelSelectionPage },
    { path: '/game', component: GamePage },
    { path: '/ranking', component: RankingPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
