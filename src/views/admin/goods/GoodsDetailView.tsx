import React, { useCallback, useMemo } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { contentApi } from 'API/contentApi';
import STRINGS from 'constants/strings';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { GoodsPostI } from 'models/GoodsI';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { formikInputProps } from 'utils/formik';
import { API_RESPONSE_STATUS } from 'types/DTOTypes';
import ImageCell from 'components/table/cell/ImageCell';
import defaultImage from './defaultImage.jpeg';


const validationSchema = yup.object().shape({
    title: yup.string().required(STRINGS.REQUIRED_FIELD),
    subtitle: yup.string().required(STRINGS.REQUIRED_FIELD),
    description: yup.string(),
    price: yup.number().required(STRINGS.REQUIRED_FIELD).typeError(STRINGS.FIELD_MUST_CONTAIN_ONLY_NUMBERS),
    sellingPrice: yup.string().required(STRINGS.REQUIRED_FIELD),
    rating: yup.string().required(STRINGS.REQUIRED_FIELD),
    ratingNumberOfVotes: yup.string().required(STRINGS.REQUIRED_FIELD),
    tags: yup.string().required(STRINGS.REQUIRED_FIELD),
    amount: yup.string().required(STRINGS.REQUIRED_FIELD),
    displayInShop: yup.string().required(STRINGS.REQUIRED_FIELD),
});

const emptyValues = {
    categoryId: 1,
    title: '',
    subtitle: '',
    description: '',
    price: 500,
    sellingPrice: 500,
    rating: 5,
    ratingNumberOfVotes: 20,
    tags: '',
    amount: 10,
    displayInShop: 1,
};

const GoodsDetailView = () => {
    const { data, error, isLoading } = contentApi.useFetchGoodsQuery('');
    const id = Number(useParams().id);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const brandStars = useColorModeValue('brand.500', 'brand.400');
    const initialValues = id ? data.data.find((item) => item.id === id) : emptyValues;

    const editMode = useMemo(() => !!id, [id]);
    const navigate = useNavigate();
    const [updateGood, updateGoodResult] = contentApi.useUpdateGoodMutation();
    const [addGood, addGoodResult] = contentApi.useAddGoodMutation();

    const updateHandler = useCallback(
        (values: GoodsPostI) => {
            updateGood(values)
                .unwrap()
                .then((fulfilled) => {
                    if (fulfilled.status === API_RESPONSE_STATUS.OK) {
                        navigate(-1);
                    }
                })
                .catch((rejected) => console.error(rejected));
        },
        [navigate, updateGood],
    );
    const addHandler = useCallback(
        (values: GoodsPostI) => {
            addGood(values)
                .unwrap()
                .then((fulfilled) => {
                    if (fulfilled.status === API_RESPONSE_STATUS.OK) {
                        navigate(-1);
                    }
                })
                .catch((rejected) => console.error(rejected));
        },
        [navigate, addGood],
    );

    const formik = useFormik<GoodsPostI>({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if (editMode) {
                updateHandler(values);
            } else {
                addHandler(values);
            }
        },
    });
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Card flexDirection="column" w="100%" px="24px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
                <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
                    <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                        {(editMode ? STRINGS.EDIT : STRINGS.ADD) + ' ' + STRINGS.GOODS.toLowerCase()}
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
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.NAME}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('title', formik)}
                                variant="auth"
                                isRequired={true}
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                placeholder='Например "насос на Webasto 2000"'
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.SUBTITLE}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('subtitle', formik)}
                                variant="auth"
                                isRequired={true}
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                placeholder='Например "Подходит от 2квт до 4квт"'
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.DESCRIPTION}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('description', formik)}
                                variant="auth"
                                isRequired={true}
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                placeholder='Например "От лучшего производителя запчастей и т.д."'
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.PRICE}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('price', formik)}
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.SELLING_PRICE}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('sellingPrice', formik)}
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.RATING}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('rating', formik)}
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                placeholder='Например "Насосы"'
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.NUMBER_OF_VOTES}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('ratingNumberOfVotes', formik)}
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                placeholder='Например "Насосы"'
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.CATEGORY}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('categoryId', formik)}
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                placeholder='Например "Насосы"'
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.TAGS}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('tags', formik)}
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                placeholder='Например "Насосы"'
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.AMOUNT}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('amount', formik)}
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                placeholder='Например "Насосы"'
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.DISPLAY_ON_SITE}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                {...formikInputProps<GoodsPostI>('displayInShop', formik)}
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                placeholder='Например "Насосы"'
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                            />
                            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                                {STRINGS.IMAGE}
                                <Text color={brandStars}>*</Text>
                            </FormLabel>

                            {editMode ? <ImageCell img={formik?.values['img']} altImage={defaultImage} /> : null}
                            <Button
                                type="submit"
                                fontSize="sm"
                                variant="brand"
                                fontWeight="500"
                                w="100%"
                                h="50"
                                mt="24px"
                                isLoading={addGoodResult.isLoading || updateGoodResult.isLoading}>
                                {editMode ? STRINGS.SAVE : STRINGS.ADD}
                            </Button>
                        </FormControl>
                    </form>
                </Box>
            </Card>
        </Box>
    );
};

export default GoodsDetailView;
