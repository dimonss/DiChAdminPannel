import React from 'react';
import GoodsTable from 'views/admin/goods/GoodsTable';
import { Box } from '@chakra-ui/react';
import { contentApi } from 'API/contentApi';
import STRINGS from 'constants/strings';

const GoodsView = () => {
    const { data, isLoading, isError } = contentApi.useFetchGoodsQuery('');
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
