class Ingredient {
  /**
   * Ingredient instances properties
   * @param {{ name: string, quantity: number, unit: string }} props 
   */
  constructor(props = {}) {
    this.name = props['name'] || '';
    this.quantity = props['quantity'] || '';
    this.unit = props['unit'] || 'g';
  }
}

export default Ingredient;