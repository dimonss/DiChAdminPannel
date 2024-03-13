import React from 'react';
import { Icon, useColorModeValue } from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';
import IconBox from 'components/icons/IconBox';
import { Link } from 'react-router-dom';

interface PropsI {
    url?: string;
}

const DetailCell: React.FC<PropsI> = ({ url }) => {
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const brandColor = useColorModeValue('brand.500', 'brand.100');
    return (
        <Link to={url}>
            <IconBox cursor="pointer" w="24px" h="24px" bg={boxBg} icon={<Icon w="16px" h="16px" as={FaEye} color={brandColor} />} />
        </Link>
    );
};

export default DetailCell;
