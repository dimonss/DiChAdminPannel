import React, { useState, useMemo, useCallback } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { contentApi } from 'API/contentApi';
import STRINGS from 'constants/strings';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { API_RESPONSE_STATUS } from 'types/DTOTypes';

const CategoryDetailView = () => {
    const { data, error, isLoading } = contentApi.useFetchCategoryQuery('');
    const id = Number(useParams().id);
    const categoryName = data.data.find((item) => item.id === id)?.name;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const brandStars = useColorModeValue('brand.500', 'brand.400');

    const [localName, setLocalName] = useState(categoryName);
    const saveAvailable = useMemo(() => localName !== categoryName && localName.length > 2 && localName.length < 20, [localName, categoryName]);
    const editMode = useMemo(() => !!id, [id]);
    const navigate = useNavigate();
    const [updateNote, updateResult] = contentApi.useUpdateCategoryMutation();
    const [addNote, addResult] = contentApi.useAddCategoryMutation();
    const updateHandler = useCallback(() => {
        updateNote({ id: String(id), newName: localName })
            .unwrap()
            .then((fulfilled) => {
                if (fulfilled.status === API_RESPONSE_STATUS.OK) {
                    navigate(-1);
                }
            })
            .catch((rejected) => console.error(rejected));
    }, [navigate, id, localName, updateNote]);
    const addHandler = useCallback(() => {
        addNote(localName)
            .unwrap()
            .then((fulfilled) => {
                if (fulfilled.status === API_RESPONSE_STATUS.OK) {
                    navigate(-1);
                }
            })
            .catch((rejected) => console.error(rejected));
    }, [navigate, localName, addNote]);
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Card flexDirection="column" w="100%" px="24px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
                <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
                    <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                        {(editMode ? STRINGS.EDIT : STRINGS.ADDING) + ' ' + STRINGS.CATEGORIES.toLowerCase()}
                    </Text>
                    {error && (
                        <Text fontSize="sm" color="red.400">
                            {STRINGS.UPS}
                        </Text>
                    )}
                    {isLoading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}
                    <Menu />
                </Flex>
                <Box>
                    <FormControl>
                        <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                            {STRINGS.NAME}
                            <Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant="auth"
                            fontSize="sm"
                            ms={{ base: '0px', md: '0px' }}
                            placeholder='Например "Насосы"'
                            mb="24px"
                            fontWeight="500"
                            size="lg"
                            value={localName}
                            onChange={(e) => {
                                setLocalName(e.target.value);
                            }}
                        />
                        <Button
                            isDisabled={!saveAvailable}
                            fontSize="sm"
                            variant="brand"
                            fontWeight="500"
                            w="100%"
                            h="50"
                            mb="24px"
                            onClick={editMode ? updateHandler : addHandler}
                            isLoading={updateResult.isLoading || addResult.isLoading}>
                            {editMode ? STRINGS.SAVE : STRINGS.ADD}
                        </Button>
                    </FormControl>
                </Box>
            </Card>
        </Box>
    );
};

export default CategoryDetailView;
