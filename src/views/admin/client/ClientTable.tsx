import { Box, Flex, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';
// Assets
import { ClientI } from 'models/ClientI';
import STRINGS from 'constants/strings';
import ImageCell from 'components/table/cell/ImageCell';
import defaultAvatarImage from './default-avatar.png';

const columnHelper = createColumnHelper<ClientI>();

interface PropsI {
    tableData: ClientI[];
    isLoading?: Boolean;
    error?: string;
}

const NotificationTable: React.FC<PropsI> = ({ tableData = [], isLoading, error }) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const columns = [
        columnHelper.accessor('id', {
            id: 'id',
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.ID}
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),

        columnHelper.accessor('firstname', {
            id: 'firstname',
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.FIRSTNAME}
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        {info.getValue()}
                    </Text>
                </Flex>
            ),
        }),
        columnHelper.accessor('lastname', {
            id: 'lastname',
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.LASTNAME}
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor('phoneNumber', {
            id: 'phoneNumber',
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.PHONE_NUMBER}
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor('username', {
            id: 'username',
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.USERNAME}
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor('discount', {
            id: 'discount',
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.DISCOUNT}
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor('regDate', {
            id: 'regDate',
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.REGISTRATION_DATA}
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor('photo', {
            id: 'photo',
            header: () => (
                <Text align={'center'} fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.PHOTO}
                </Text>
            ),
            cell: (info) => (
                <ImageCell altImage={defaultAvatarImage} img={info.getValue()} />
            ),
        }),
    ];
    const table = useReactTable({
        data: tableData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });
    return (
        <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
                <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                    {STRINGS.LIST}
                </Text>
                {error && (
                    <Text fontSize="sm" color="red.400">
                        {error}
                    </Text>
                )}
                {isLoading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}
                <Menu />
            </Flex>
            <Box>
                <Table variant="simple" color="gray.500" mb="24px" mt="12px">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            pe="10px"
                                            borderColor={borderColor}
                                            cursor="pointer"
                                            onClick={header.column.getToggleSortingHandler()}>
                                            <Flex
                                                justifyContent="space-between"
                                                align="center"
                                                fontSize={{ sm: '10px', lg: '12px' }}
                                                color="gray.400">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{
                                                    asc: '',
                                                    desc: '',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </Flex>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td
                                                key={cell.id}
                                                fontSize={{ sm: '14px' }}
                                                minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                                                borderColor="transparent">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Box>
        </Card>
    );
};

export default NotificationTable;
