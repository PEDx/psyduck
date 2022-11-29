import { FC } from 'react'
import {
  Box,
  Flex,
  Button,
  Heading,
  useColorMode,
  useColorModeValue,
  Card,
} from '@chakra-ui/react'
import { Viewport } from './Viewport'

export const Editor: FC = () => {
  const { toggleColorMode } = useColorMode()
  const bg = useColorModeValue('#f5f5f5', '#222b3a')
  return (
    <Flex flexDirection={'column'} h={'100%'}>
      <Card borderRadius={0}>
        <Flex
          className='top-bar'
          h='36px'
          p='0 16px'
          justifyContent='space-between'
          align={'center'}
        >
          <Heading>Psyduck</Heading>
          <Button onClick={toggleColorMode}>Toggle Mode</Button>
        </Flex>
      </Card>
      <Flex
        className='content'
        h={'100%'}
        justifyContent='space-between'
        align={'center'}
      >
        <Card
          className='left-panel'
          w={300}
          h={'100%'}
          bg={'var(--editor-gird-color)'}
          borderRadius={0}
        ></Card>
        <Box
          flex={'1'}
          h={'100%'}
          pt="36px"
          style={{
            backgroundPosition: ' 0 0, 8px 8px',
            backgroundSize: '16px 16px',
            backgroundImage: `linear-gradient(45deg,${'var(--editor-gird-color)'} 25%,transparent 0,transparent 75%,${'var(--editor-gird-color)'} 0,${'var(--editor-gird-color)'}),linear-gradient(45deg,${'var(--editor-gird-color)'} 25%,transparent 0,transparent 75%,${'var(--editor-gird-color)'} 0,${'var(--editor-gird-color)'})`,
          }}
        >
          <Viewport />
        </Box>
        <Card
          className='right-panel'
          w={300}
          h={'100%'}
          bg={'var(--editor-gird-color)'}
          borderRadius={0}
        ></Card>
      </Flex>
    </Flex>
  )
}
