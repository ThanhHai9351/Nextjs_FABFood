import React from 'react';
import ButtonDarkMode from '@/components/ui/button-dark-mode'
import ButtonLogout from '@/components/ui/button-logout';

const Header = () => {
    return (
        <div>
            <ButtonDarkMode />
            <ButtonLogout />
        </div>
    );
}

export default Header;
