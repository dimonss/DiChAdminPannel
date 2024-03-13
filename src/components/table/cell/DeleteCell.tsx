import React from 'react';
import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import IconBox from 'components/icons/IconBox';

interface PropsI {
    deleteCallback: () => void;
}

const DeleteCell: React.FC<PropsI> = ({ deleteCallback }) => {
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const brandColor = useColorModeValue('red.600', 'red.600');
    return (
        <Flex cursor="pointer" onClick={deleteCallback}>
            <IconBox w="24px" h="24px" bg={boxBg} icon={<Icon w="16px" h="16px" as={MdDelete} color={brandColor} />} />
        </Flex>
    );
};

export default DeleteCell;
