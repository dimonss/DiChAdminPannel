import React from 'react';
import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import STRINGS from 'constants/strings';
import IconBox from 'components/icons/IconBox';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

interface PropsI {
    link: string;
}

const AddNoteButton: React.FC<PropsI> = ({ link }) => {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const navigate = useNavigate();
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const brandColor = useColorModeValue('brandScheme.500', 'white');

    return (
        <Flex cursor="pointer" onClick={() => navigate(link + '0')}>
            <Text color={textColor} fontSize="16px" fontWeight="400" lineHeight="26px" mr={'16px'}>
                {STRINGS.ADD}
            </Text>
            <IconBox w="24px" h="24px" bg={boxBg} icon={<Icon w="16px" h="16px" as={BiSolidAddToQueue} color={brandColor} />} />
        </Flex>
    );
};

export default AddNoteButton;
