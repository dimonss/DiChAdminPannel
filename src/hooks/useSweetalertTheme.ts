import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

const UseSweetalertTheme: () => void = () => {
    const { colorMode } = useColorMode();
    useEffect(() => {
        var ss = document.createElement('link');
        ss.rel = 'stylesheet';
        ss.id = 'sweetalertDarkMode';
        if (colorMode === 'dark') {
            ss.href = '//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css';
            document.head.appendChild(ss);
        } else {
            document.getElementById('sweetalertDarkMode')?.remove();
        }
    }, [colorMode]);
};

export default UseSweetalertTheme;
