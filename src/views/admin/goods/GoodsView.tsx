import React from 'react';
// import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
// import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
// import { fetchGoods } from 'store/slices/contentSlice';
import GoodsTable from 'views/admin/goods/GoodsTable';
import { Box } from '@chakra-ui/react';
import { mainAPIRTKQuery } from 'API/mainAPIRTKQuery';
// import { GOODS } from 'API/endpoints';
import STRINGS from 'constants/strings';

const GoodsView = () => {
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(fetchGoods());
    // }, [dispatch]);
    const { currentData, data, isLoading, isError, refetch } = mainAPIRTKQuery.useFetchGoodsQuery('');
    console.log('isLoading');
    console.log(isLoading);
    console.log('error');
    console.log(isError);
    console.log('Goods data');
    console.log(data);
    console.log('currentData');
    console.log(currentData);
    // const { data, isLoading, error } = ((state) => state.content.goods);
    return (
        <Box
            pt={{
                base: '130px',
                md: '80px',
                xl: '80px',
            }}>
            <button
                onClick={() => {
                    refetch();
                }}>
                Обновить
            </button>
            <GoodsTable tableData={data?.data} isLoading={isLoading} error={isError ? STRINGS.UPS : ''} />
        </Box>
    );
};

export default GoodsView;
