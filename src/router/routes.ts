export const routes: object[] = [
  {
    path: '/',
    name: 'home',
    notFound: true,
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/game',
    name: 'game',
    component: 'game-page',
    action: async () => {
      await import('../pages/game/game-page.js');
    },
  }
];
