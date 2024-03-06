import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { fetchNotification } from 'store/slices/contentSlice';
import { Box } from '@chakra-ui/react';
import NotificationTable from 'views/admin/notification/NotificationTable';

const NotificationView = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchNotification());
    }, [dispatch]);
    const { data, isLoading, error } = useAppSelector((state) => state.content.notification);
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <NotificationTable tableData={data} isLoading={isLoading} error={error} />
        </Box>
    );
};

export default NotificationView;
