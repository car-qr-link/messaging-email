import { readFileSync } from "fs";

export const TEMPLATE = readFileSync('./assets/notification.html', 'utf8');
export const LOGO_IMAGE = readFileSync('./assets/logo.png', 'base64');
