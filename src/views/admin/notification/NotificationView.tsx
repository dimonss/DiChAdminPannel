import React from 'react';
import { Box } from '@chakra-ui/react';
import NotificationTable from 'views/admin/notification/NotificationTable';
import { contentAPI } from 'API/contentAPI';
import STRINGS from 'constants/strings';

const NotificationView = () => {
    const { data, isLoading, isError } = contentAPI.useFetchNotificationsQuery('');
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <NotificationTable tableData={data?.data} isLoading={isLoading} error={isError ? STRINGS.UPS : ''} />
        </Box>
    );
};

export default NotificationView;
