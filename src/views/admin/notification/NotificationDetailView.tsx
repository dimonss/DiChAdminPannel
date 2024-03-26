import React, { useState, useMemo, useCallback } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { contentApi } from 'API/contentApi';
import STRINGS from 'constants/strings';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { API_RESPONSE_STATUS } from 'types/DTOTypes';

const CategoryDetailView = () => {
    const { data, error, isLoading } = contentApi.useFetchNotificationsQuery('');
    const id = Number(useParams().id);
    const { title, description, img } =
        id === 0
            ? {
                  title: '',
                  description: '',
                  img: '',
              }
            : data?.data?.find((item) => item.id === id);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const brandStars = useColorModeValue('brand.500', 'brand.400');

    const [localTitle, setLocalTitle] = useState(title);
    const [localDescription, setLocalDescription] = useState(description);
    const [localImg, setLocalImg] = useState(img);
    const saveAvailable = useMemo(
        () =>
            (localTitle !== title || localDescription !== description || localImg !== img) &&
            localTitle.length > 2 &&
            localTitle.length < 200 &&
            localDescription.length > 2 &&
            localDescription.length < 200 &&
            localImg.length > 2 &&
            localImg.length < 200,
        [title, description, img, localTitle, localDescription, localImg],
    );
    const editMode = useMemo(() => !!id, [id]);
    const navigate = useNavigate();
    const [updateNote, updateResult] = contentApi.useUpdateNotificationMutation();
    const [addNote, addResult] = contentApi.useAddNotificationMutation();
    const updateHandler = useCallback(() => {
        const body = { id, title: localTitle, description: localDescription, img: localImg };
        updateNote(body)
            .unwrap()
            .then((fulfilled) => {
                if (fulfilled.status === API_RESPONSE_STATUS.OK) {
                    navigate(-1);
                }
            })
            .catch((rejected) => console.error(rejected));
    }, [navigate, id, localTitle, updateNote, localDescription, localImg]);
    const addHandler = useCallback(() => {
        const body = { title: localTitle, description: localDescription, img: localImg };
        addNote(body)
            .unwrap()
            .then((fulfilled) => {
                if (fulfilled.status === API_RESPONSE_STATUS.OK) {
                    navigate(-1);
                }
            })
            .catch((rejected) => console.error(rejected));
    }, [navigate, localTitle, addNote, localDescription, localImg]);
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Card flexDirection="column" w="100%" px="24px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
                <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
                    <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                        {(editMode ? STRINGS.EDIT : STRINGS.ADDING) + ' ' + STRINGS.NOTIFICATIONS.toLowerCase()}
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
                            placeholder='Например "Cупер акция!!!"'
                            mb="24px"
                            fontWeight="500"
                            size="lg"
                            value={localTitle}
                            onChange={(e) => {
                                setLocalTitle(e.target.value);
                            }}
                        />
                        <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                            {STRINGS.DESCRIPTION}
                            <Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant="auth"
                            fontSize="sm"
                            ms={{ base: '0px', md: '0px' }}
                            placeholder='Например "Супер описание!!!"'
                            mb="24px"
                            fontWeight="500"
                            size="lg"
                            value={localDescription}
                            onChange={(e) => {
                                setLocalDescription(e.target.value);
                            }}
                        />
                        <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                            {STRINGS.IMAGE}
                            <Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant="auth"
                            fontSize="sm"
                            ms={{ base: '0px', md: '0px' }}
                            placeholder="Ссылка на картинку"
                            mb="24px"
                            fontWeight="500"
                            size="lg"
                            value={localImg}
                            onChange={(e) => {
                                setLocalImg(e.target.value);
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
