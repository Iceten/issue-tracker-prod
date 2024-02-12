import { Box, Card, Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const loadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
       <Skeleton />
        <Flex className="space-x-3 my-2">
            <Skeleton width="5rem"/>
            <Skeleton width="5rem"/>
        </Flex>
        <Card>
        <Skeleton count={3}/>  
        </Card>
    </Box>
  )
}

export default loadingIssueDetailPage