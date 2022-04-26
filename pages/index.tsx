import type { NextPage } from 'next';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  keyframes,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const Home: NextPage = () => {
  const windowRef = useRef(null);
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [reverse, setReverse] = useState<boolean>(false);
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
  const reverseRotate = keyframes`
    0%{ transform:rotate(0);}
    100%{ transform:rotate(-360deg);
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
      position={'relative'}
    >
      <Head>
        <title>PDCA Cycle</title>
        <meta property="og:url" content="https://www.pdca-cycle.jp/" />

        <meta property="og:type" content="website" />

        <meta property="og:title" content="PDCA Cycle" />

        <meta property="og:description" content="PDCA 回さない？" />

        <meta property="og:site_name" content="PDCA Cycle" />

        <meta property="og:image" content="https://www.pdca-cycle.jp/ogp.png" />
      </Head>
      {width && height ? (
        <Flex
          width={width < height ? width / 1.42 - 25 + 'px' : height / 1.42 - 25 + 'px'}
          height={width < height ? width / 1.42 - 25 + 'px' : height / 1.42 - 25 + 'px'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          animation={`1s linear infinite ${reverse ? reverseRotate : rotate}`}
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
      ) : null}
      <FormControl
        display="flex"
        position={'absolute'}
        alignItems={'center'}
        top={2}
        left={0}
        px={4}
      >
        <FormLabel htmlFor="reverse" mb="0">
          Reverse?
        </FormLabel>
        <Switch
          id="reverse"
          isChecked={reverse}
          onChange={(e) => {
            setReverse(e.target.checked);
          }}
        />
      </FormControl>
    </Flex>
  );
};

export default Home;
