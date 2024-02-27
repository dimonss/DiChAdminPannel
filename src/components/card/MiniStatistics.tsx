// Chakra imports
import {Flex, Stat, StatLabel, StatNumber, useColorModeValue, Text, Spinner} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

export default function Default(props: {
    startContent?: JSX.Element;
    endContent?: JSX.Element;
    name: string;
    growth?: string | number;
    value: string | number;
    isLoading?: boolean;
}) {
    const {startContent, endContent, name, growth, value, isLoading} = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorSecondary = 'secondaryGray.600';

    return (
        <Card py='15px'>
            <Flex my='auto' h='100%' align={{base: 'center', xl: 'start'}} justify={{base: 'center', xl: 'center'}}>
                {startContent}

                <Stat my='auto' ms={startContent ? '18px' : '0px'}>
                    <StatLabel
                        lineHeight='100%'
                        color={textColorSecondary}
                        fontSize={{
                            base: 'sm'
                        }}>
                        {name}
                    </StatLabel>
                    <Flex align='center' height={'36px'}>
                        {isLoading ? <Spinner
                            thickness='4px'
                            speed='0.35s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='md'
                            position='absolute'
                        /> : <StatNumber
                            color={textColor}
                            fontSize={{
                                base: '2xl'
                            }}>
                            {value}
                        </StatNumber>}
                    </Flex>

                    {growth ? (
                        <Flex align='center'>
                            <Text color='green.500' fontSize='xs' fontWeight='700' me='5px'>
                                {growth}
                            </Text>
                            <Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
                                since last month
                            </Text>
                        </Flex>
                    ) : null}
                </Stat>
                <Flex ms='auto' w='max-content'>
                    {endContent}
                </Flex>
            </Flex>
        </Card>
    );
}
