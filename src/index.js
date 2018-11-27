import { Products } from './products';

export function setVegetarianState(state, doc = window.document) {

    [...doc.getElementsByClassName('category')].map((category) => new Products(category).updateState(state));

};