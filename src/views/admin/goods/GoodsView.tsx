import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { fetchGoods } from 'store/slices/goodsSlice';
import GoodsTable from 'views/admin/goods/GoodsTable';
import { Box } from '@chakra-ui/react';

const GoodsView = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchGoods());
    }, [dispatch]);
    const { data, isLoading, error } = useAppSelector((state) => state.goods);
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <GoodsTable tableData={data} isLoading={isLoading} error={error} />
        </Box>
    );
};

export default GoodsView;
