'use strict';

const Product = require('../models/Product');

describe('Product model', () => {
  test('getAll returns all products', () => {
    const products = Product.getAll();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThanOrEqual(6);
  });

  test('getById returns the correct product', () => {
    const product = Product.getById(1);
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
    expect(product.name).toContain('Sauce Labs Backpack');
  });

  test('getById returns undefined for missing product', () => {
    expect(Product.getById(999)).toBeUndefined();
  });

  test('getCategories returns unique categories', () => {
    const categories = Product.getCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(new Set(categories).size).toBe(categories.length);
    expect(categories).toEqual(expect.arrayContaining(['Accessories', 'Apparel', 'Outdoor']));
  });

  test('getTypes returns unique types from JSON', () => {
    const types = Product.getTypes();
    expect(Array.isArray(types)).toBe(true);
    expect(new Set(types).size).toBe(types.length);
    expect(types).toEqual(expect.arrayContaining(['Backpack', 'T-Shirt', 'Onesie']));
  });

  test('includes water bottle product', () => {
    const products = Product.getAll();
    const waterBottle = products.find(p => p.id === 7);
    expect(waterBottle).toBeDefined();
    expect(waterBottle.name).toBe('Sauce Labs Water Bottle');
    expect(waterBottle.price).toBe(14.99);
    expect(waterBottle.category).toBe('Accessories');
    expect(waterBottle.type).toBe('Water Bottle');
    expect(waterBottle.badge).toBe('New');
  });

  test('water bottle is retrievable by id', () => {
    const waterBottle = Product.getById(7);
    expect(waterBottle).toBeDefined();
    expect(waterBottle.name).toBe('Sauce Labs Water Bottle');
    expect(waterBottle.image).toBe('/images/water-bottle.svg');
  });
});
