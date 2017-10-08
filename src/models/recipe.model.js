import Ingredient from './ingredient.model';

class Recipe {
  /**
   * Recipe instances properties
   * @param {{ id: string, name: string, img: string, description: string, ingredients: [Ingredient] }} props 
   */
  constructor(props = {}) {
    this.id = props['id'] || null;
    this.name = props['name'] || '';
    this.img = props['img'] || '';
    this.description = props['description'] || '';
    this.ingredients = props['ingredients'] || [new Ingredient()];
  }
}

export default Recipe;