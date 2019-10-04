import React from 'react';
const CartDropdown = require('./cart-dropdown.component');

const cartItem = ['shoes', 'bags', 'tshirts']

describe('cartDropdown', () => {
    it('check if cart is empty or not', () => {
           
        expect(('shoes',cartItem).length).toBeGreaterThanOrEqual(1)
    })
})

    // it('sum of numbers' , () => {
    //     const name = 'hello'
    //     expect(name).toBe('hello')
    // })