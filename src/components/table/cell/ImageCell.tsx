import React, { useCallback } from 'react';
import { getFullPathToImg } from 'utils/utils';
import { Flex } from '@chakra-ui/react';
import Swal from 'sweetalert2';

interface PropsI {
    img: string;
    altImage: string;
    fullPath?: boolean;
}

const ImageCell: React.FunctionComponent<PropsI> = ({ img, altImage, fullPath }) => {
    const openImageInModalWindow = useCallback(() => {
        Swal.fire({
            imageUrl: fullPath ? img : getFullPathToImg(img),
            imageWidth: 600,
            showCloseButton: true,
            showConfirmButton: false,
            allowOutsideClick: true,
        });
    }, [img, fullPath]);
    return (
        <Flex
            sx={{ cursor: 'pointer' }}
            justifyContent={'center'}
            borderRadius={'50%'}
            overflow={'hidden'}
            w={'60px'}
            onClick={openImageInModalWindow}>
            <img
                src={fullPath ? img : getFullPathToImg(img)}
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
