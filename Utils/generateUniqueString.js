import {  customAlphabet } from 'nanoid';


export const generateUniqueString = (length) => {
    const nanoid = customAlphabet('mohamedez573', length);
    return nanoid();
}
