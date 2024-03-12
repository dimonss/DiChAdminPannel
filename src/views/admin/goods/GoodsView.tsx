import React from 'react';
import GoodsTable from 'views/admin/goods/GoodsTable';
import { Box } from '@chakra-ui/react';
import { contentAPI } from 'API/contentAPI';
import STRINGS from 'constants/strings';

const GoodsView = () => {
    const { data, isLoading, isError } = contentAPI.useFetchGoodsQuery('');
    return (
        <Box
            pt={{
                base: '130px',
                md: '80px',
                xl: '80px',
            }}>
            <GoodsTable tableData={data?.data} isLoading={isLoading} error={isError ? STRINGS.UPS : ''} />
        </Box>
    );
};

export default GoodsView;
