import type { NextPage } from 'next';
import { Box, Flex, keyframes, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  const windowRef = useRef(null);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  useEffect(() => {
    const windowRefObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
      setHeight(entries[0].contentRect.height);
    });
    windowRef.current && windowRefObserver.observe(windowRef.current);

    return () => {
      windowRefObserver.disconnect();
    };
  }, [windowRef]);
  const rotate = keyframes`
    0%{ transform:rotate(0);}
    100%{ transform:rotate(360deg);
  `;
  return (
    <Flex
      w={'100vw'}
      h={'100vh'}
      minW={'100vw'}
      minH={'100vh'}
      maxW={'100vw'}
      maxH={'100vh'}
      ref={windowRef}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex
        width={width < height ? width / 1.42 - 25 + 'px' : height / 1.42 - 25 + 'px'}
        height={width < height ? width / 1.42 - 25 + 'px' : height / 1.42 - 25 + 'px'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        animation={`1s linear infinite ${rotate}`}
      >
        <Text
          fontWeight={900}
          fontSize={
            (width / 1.42 - 25) / 2 < (height / 1.42 - 25) / 2
              ? (width / 1.42 - 25) / 2 + 'px'
              : (height / 1.42 - 25) / 2 + 'px'
          }
          lineHeight={0.8}
        >
          PD
        </Text>
        <Text
          fontWeight={900}
          fontSize={
            (width - 25) / 2 < (height / 1.42 - 25) / 2
              ? (width / 1.42 - 25) / 2 + 'px'
              : (height / 1.42 - 25) / 2 + 'px'
          }
          lineHeight={0.8}
        >
          CA
        </Text>
      </Flex>
    </Flex>
  );
};

export default Home;
