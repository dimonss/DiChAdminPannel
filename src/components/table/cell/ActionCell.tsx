import React from 'react';
import { Flex } from '@chakra-ui/react';
import DetailCell from 'components/table/cell/DetailCell';
import DeleteCell from 'components/table/cell/DeleteCell';

interface PropsI {
    deleteCallback?: () => void;
    urlToDetail?: string;
}

const ActionCell: React.FC<PropsI> = ({ deleteCallback, urlToDetail }) => {
    return (
        <Flex width={'60px'} justify="space-between">
            {urlToDetail && <DetailCell url={urlToDetail} />} {deleteCallback && <DeleteCell deleteCallback={deleteCallback} />}
        </Flex>
    );
};

export default ActionCell;
