import { Box, Flex, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import * as React from 'react';
import { useCallback } from 'react';
// Assets
import { NotificationI } from 'models/NotificationI';
import STRINGS from 'constants/strings';
import ActionCell from 'components/table/cell/ActionCell';
import { NOTIFICATION_DETAIL_RAW } from 'constants/urls';
import Swal from 'sweetalert2';
import { API_RESPONSE_STATUS } from 'types/DTOTypes';
import { contentApi } from 'API/contentApi';
import { useNavigate } from 'react-router-dom';
import IconBox from 'components/icons/IconBox';
import { BiSolidAddToQueue } from 'react-icons/bi';

const columnHelper = createColumnHelper<NotificationI>();

interface PropsI {
    tableData: NotificationI[];
    isLoading?: Boolean;
    error?: string;
}

const NotificationTable: React.FC<PropsI> = ({ tableData = [], isLoading, error }) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const brandColor = useColorModeValue('brandScheme.500', 'white');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const errorAlert = (error: string) => Swal.fire('Ошибка!', error, 'error');
    const [deleteNote] = contentApi.useDeleteNotificationMutation();
    const navigate = useNavigate();

    const deleteHandler = useCallback(
        (id: string) => {
            Swal.fire({
                title: STRINGS.ARE_YOU_SURE,
                text: STRINGS.YOU_CANT_RESTORE_IT,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: STRINGS.YES_DELETE,
                cancelButtonText: STRINGS.CANCEL,
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteNote(id)
                        .unwrap()
                        .then((fulfilled) => {
                            if (fulfilled.status === API_RESPONSE_STATUS.OK) {
                                Swal.fire({
                                    title: STRINGS.DELETED,
                                    text: STRINGS.CATEGORY_DELETED_SUCCESSFULLY,
                                    icon: 'success',
                                });
                            } else {
                                errorAlert(STRINGS.UNKNOWN_ERROR);
                            }
                        })
                        .catch((rejected) => {
                            errorAlert(STRINGS.UNKNOWN_ERROR);
                            console.error(rejected);
                        });
                }
            });
        },
        [deleteNote],
    );
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

        columnHelper.accessor('title', {
            id: 'title',
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.NAME}
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
        columnHelper.accessor('description', {
            id: 'description',
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.DESCRIPTION}
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor('img', {
            id: 'img',
            header: () => (
                <Text align={'center'} fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.IMAGE}
                </Text>
            ),
            cell: (info) => (
                <Flex justifyContent={'center'}>
                    <img src={info.getValue()} width={'60px'} alt={'none'} />
                </Flex>
            ),
        }),
        {
            id: 'edit',
            cell: (item: any) => (
                <ActionCell
                    urlToDetail={NOTIFICATION_DETAIL_RAW + item?.row?.original?.id}
                    deleteCallback={() => {
                        deleteHandler(item?.row?.original?.id);
                    }}
                />
            ),
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {STRINGS.OPERATIONS}
                </Text>
            ),
        },
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
                    {STRINGS.NOTIFICATIONS}
                </Text>
                {error && (
                    <Text fontSize="sm" color="red.400">
                        {error}
                    </Text>
                )}
                {isLoading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}
                <Flex cursor="pointer" onClick={() => navigate(NOTIFICATION_DETAIL_RAW + '0')}>
                    <Text color={textColor} fontSize="16px" fontWeight="400" lineHeight="26px" mr={'16px'}>
                        {STRINGS.ADD}
                    </Text>
                    <IconBox w="24px" h="24px" bg={boxBg} icon={<Icon w="16px" h="16px" as={BiSolidAddToQueue} color={brandColor} />} />
                </Flex>
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
