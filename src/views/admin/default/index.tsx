/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue} from '@chakra-ui/react';
// Assets
import usaImg from 'assets/img/dashboards/usa.png';
import euImg from './img/euFlag.png';
import ruImg from './img/russiaFlag.png';
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy} from 'react-icons/md';
import CheckTable from 'views/admin/rtl/components/CheckTable';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
import {useEffect, useState, ChangeEvent, useRef, useCallback, useMemo} from "react";
import axios from 'axios';
import STRINGS from 'constants/strings';

type CurrencyTypeI = 'USD' | 'EUR' | 'RUB';

enum CURRENCY_TYPE {
    USD = 'USD',
    EUR = 'EUR',
    RUB = 'RUB',
}

export default function UserReports() {
    // Chakra Color Mode
    const brandColor = useColorModeValue('brand.500', 'white');
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

    const [usdCost, setUsdCost] = useState("0");
    const [currency, setCurrency] = useState<CurrencyTypeI | string>(CURRENCY_TYPE.USD);
    const [isLoading, setIsLoading] = useState(false);
    const firstRender = useRef(true);

    const getCurrency = useCallback(() => {
        setIsLoading(true);
        const url = "https://v6.exchangerate-api.com/v6/88046671966c78a8f5e7f503/latest/" + currency;
        axios.get(url)
            .then(res => {
                const persons = res.data;
                if (persons?.result === 'success') {
                    setUsdCost(String(persons?.conversion_rates?.KGS));
                } else {
                    setUsdCost(STRINGS.ERROR)
                }
            })
            .catch(() => {
                setUsdCost(STRINGS.ERROR)
            }).finally(() => {
            setIsLoading(false);
        });
    }, [currency])
    const flag = useMemo(() => {
        switch (currency) {
            case CURRENCY_TYPE.USD:
                return usaImg
            case CURRENCY_TYPE.EUR:
                return euImg
            case CURRENCY_TYPE.RUB:
                return ruImg
            default:
                return usaImg
        }
    }, [currency])

    useEffect(() => {
        if (firstRender.current) {
            getCurrency();
        }
    }, [])
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return
        }
        getCurrency();
    }, [getCurrency]);

    return (
        <Box pt={{base: '130px', md: '80px', xl: '80px'}}>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3, '2xl': 6}} gap='20px' mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={<Icon w='32px' h='32px' as={MdBarChart} color={brandColor}/>}
                        />
                    }
                    name='Earnings'
                    value='$350.4'
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={<Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor}/>}
                        />
                    }
                    name='Spend this month'
                    value='$642.39'
                />
                <MiniStatistics growth='+23%' name='Sales' value='$574.34'/>
                <MiniStatistics
                    endContent={
                        <Flex me='-16px' mt='10px' position='relative'>
                            <FormLabel htmlFor='balance'>
                                <Avatar src={flag}/>
                            </FormLabel>
                            <Select id='balance' variant='mini' mt='5px' me='0px' defaultValue={CURRENCY_TYPE.USD}
                                    value={currency}
                                    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                        setCurrency(event.target.value);
                                    }}>
                                {Object.values(CURRENCY_TYPE).map((item: CurrencyTypeI) => (
                                    <option value={item}>{item}</option>
                                ))}
                            </Select>
                        </Flex>
                    }
                    name={STRINGS.EXCHANGE_RATES}
                    value={usdCost}
                    isLoading={isLoading}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                            icon={<Icon w='28px' h='28px' as={MdAddTask} color='white'/>}
                        />
                    }
                    name='New Tasks'
                    value='154'
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={<Icon w='32px' h='32px' as={MdFileCopy} color={brandColor}/>}
                        />
                    }
                    name='Total Projects'
                    value='2935'
                />
            </SimpleGrid>

            <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap='20px' mb='20px'>
                <TotalSpent/>
                <WeeklyRevenue/>
            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
                <CheckTable tableData={tableDataCheck}/>
                <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap='20px'>
                    <DailyTraffic/>
                    <PieCard/>
                </SimpleGrid>
            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>
                <ComplexTable tableData={tableDataComplex}/>
                <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap='20px'>
                    <Tasks/>
                    <MiniCalendar h='100%' minW='100%' selectRange={false}/>
                </SimpleGrid>
            </SimpleGrid>
        </Box>
    );
}
