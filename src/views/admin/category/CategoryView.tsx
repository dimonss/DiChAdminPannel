import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { fetchCategory } from 'store/slices/contentSlice';
import { Box } from '@chakra-ui/react';
import CategoryTable from 'views/admin/category/CategoryTable';

const CategoryView = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);
    const { data, isLoading, error } = useAppSelector((state) => state.content.category);
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <CategoryTable tableData={data} isLoading={isLoading} error={error} />
        </Box>
    );
};

export default CategoryView;
