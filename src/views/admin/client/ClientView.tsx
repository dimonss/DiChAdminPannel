import React from 'react';
import { Box } from '@chakra-ui/react';
import { contentApi } from 'API/contentApi';
import STRINGS from 'constants/strings';
import ClientTable from "views/admin/client/ClientTable";

const ClientView = () => {
    const { data, isLoading, isError } = contentApi.useFetchClientsQuery('');
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <ClientTable tableData={data?.data} isLoading={isLoading} error={isError ? STRINGS.UPS : ''} />
        </Box>
    );
};

export default ClientView;
