import { initializeApp } from '../app';
import CONFIG from '../config/config';

initializeApp().listen(CONFIG.PORT);
console.log(`Serverless Local listening on port ${CONFIG.PORT}`);
