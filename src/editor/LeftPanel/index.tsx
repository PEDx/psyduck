import { useEffect, FC } from 'react'
import { Box, Center } from '@chakra-ui/react'

export const LeftPanel: FC = () => {
  useEffect(() => {}, [])

  return (
    <Box p='16px' fontSize='12px'>
      <Center
        cursor='pointer'
        height='40px'
        borderWidth='1px'
        borderRadius='lg'
        mb='8px'
      >
        image
      </Center>
      <Center
        cursor='pointer'
        height='40px'
        borderWidth='1px'
        borderRadius='lg'
      >
        container
      </Center>
    </Box>
  )
}
