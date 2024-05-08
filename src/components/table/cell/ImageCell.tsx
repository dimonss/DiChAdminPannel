import React from 'react';
import { getFullPathToImg } from 'utils/utils';
import { Flex } from '@chakra-ui/react';

interface PropsI {
    img: string;
    altImage: string;
}

const ImageCell: React.FunctionComponent<PropsI> = ({img, altImage}) => {
    return (
        <Flex justifyContent={'center'} borderRadius={'50%'} overflow={'hidden'} w={'60px'}>
            <img
                src={getFullPathToImg(img)}
                width={'60px'}
                alt={'none'}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = altImage;
                }}
            />
        </Flex>
    );
};

export default ImageCell;
