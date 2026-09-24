import { mkdirSync, copyFileSync } from 'node:fs';
mkdirSync('site/dist', { recursive: true });
copyFileSync('index.html', 'site/index.html');
copyFileSync('dist/game.js', 'site/dist/game.js');
