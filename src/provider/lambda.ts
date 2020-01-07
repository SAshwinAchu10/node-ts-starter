require('source-map-support').install();
import { createServer, proxy } from 'aws-serverless-express';
import { Context } from 'aws-lambda';
import { initializeApp } from '../app';

const binaryMimeTypes: string[] = [];
const app = initializeApp();
const server = createServer(app, undefined, binaryMimeTypes);

export const http = (event: any, context: Context) => {
  proxy(server, event, context);
};
