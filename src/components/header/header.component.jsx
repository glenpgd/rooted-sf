import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect'
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

import {HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink} from './header.styles';

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink className='option' to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink className='option' to='/shop'>
        CONTACT
      </OptionLink>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropDown/>}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
}); 

export default connect(mapStateToProps)(Header);