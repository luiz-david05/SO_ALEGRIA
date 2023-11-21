import { question } from 'readline-sync';
const input = (text) => question(text);
const getNumber = (text) => Number(input(text));
export { input, getNumber };
