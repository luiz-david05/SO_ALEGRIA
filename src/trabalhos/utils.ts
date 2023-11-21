import {question} from 'readline-sync'

const input = (text: string) => question(text)

const getNumber = (text: string) => Number(input(text))

export {input, getNumber}