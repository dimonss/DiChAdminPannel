import React from 'react';
import { Box } from '@chakra-ui/react';
import CategoryTable from 'views/admin/category/CategoryTable';
import { contentApi } from 'API/contentApi';
import STRINGS from 'constants/strings';

const CategoryView = () => {
    const { data, isLoading, isError } = contentApi.useFetchCategoryQuery('');
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <CategoryTable tableData={data?.data} isLoading={isLoading} error={isError ? STRINGS.UPS : ''} />
        </Box>
    );
};

export default CategoryView;
