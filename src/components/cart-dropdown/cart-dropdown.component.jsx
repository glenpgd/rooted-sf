import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selectors'

import {CartDropDownStyle, CartItems, EmptyMessage} from './cat-dropdown.styles';

import './cart-dropdown.styles.scss';


const CartDropDown = ({cartItems, history, dispatch}) => (
    <CartDropDownStyle>
        <CartItems>
            {cartItems.length ? cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />))
            : 
            <EmptyMessage> Your cart is empty</EmptyMessage>
            }
        </CartItems>
        
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden())
        }}>
             GO TO CHECKOUT
        </CustomButton>
 
    </CartDropDownStyle>
)


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropDown));