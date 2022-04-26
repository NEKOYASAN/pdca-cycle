import type { NextPage } from 'next';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  keyframes,
  Spacer,
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
  const [manual, setManual] = useState<boolean>(false);
  const [alpha, setAlpha] = useState<number | null>(0);
  const [alreadyRequest, setAlreadyRequest] = useState<boolean>(false);
  useEffect(() => {
    if (!window.DeviceOrientationEvent) {
      setAlreadyRequest(true);
    }
    if (
      // @ts-ignore
      !DeviceOrientationEvent.requestPermission ||
      // @ts-ignore
      typeof DeviceOrientationEvent.requestPermission != 'function'
    ) {
      setAlreadyRequest(true);
    }
  }, []);
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
  const deviceorientation = (data: DeviceOrientationEvent) => {
    setAlpha(data.alpha);
  };
  const requestDeviceSensor = () => {
    // @ts-ignore
    DeviceOrientationEvent.requestPermission()
      .then(function (response: any) {
        if (response === 'granted') {
          setAlreadyRequest(true);
        }
      })
      .catch(function (e: any) {
        console.log(e);
      });
  };
  useEffect(() => {
    if (manual) {
      window.addEventListener('deviceorientation', deviceorientation);
    } else {
      window.removeEventListener('deviceorientation', deviceorientation);
    }
    return () => {
      window.removeEventListener('deviceorientation', deviceorientation);
    };
  }, [manual]);
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
          animation={manual ? undefined : `1s linear infinite ${reverse ? reverseRotate : rotate}`}
          transition={'transform 2.78ms linear'}
          transform={manual ? `rotate(${alpha}deg)` : undefined}
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
        <Spacer />
        {!alreadyRequest && (
          <Button
            onClick={() => {
              requestDeviceSensor();
            }}
          >
            Init DeviceSensor
          </Button>
        )}
        <FormLabel htmlFor="manual" mb="0">
          Manual?
        </FormLabel>
        <Switch
          disabled={!alreadyRequest}
          id="manual"
          isChecked={manual}
          onChange={(e) => {
            setManual(e.target.checked);
          }}
        />
      </FormControl>
    </Flex>
  );
};

export default Home;
