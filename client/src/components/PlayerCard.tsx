import React from 'react'
import {
    Box, 
    VStack,
    Circle,
    Image,
    Text
} from '@chakra-ui/react'
interface playerCardPropsState{
    key : number,
    user_avatar : string,
    user_id : string,
    username : string
    score : number,
    time : number
}
const PlayerCard = (props : playerCardPropsState) => {
  return (
    <Box>
        <VStack height="200px" bg="blue.300" gap={2} borderRadius="lg" p={"20px 10px"}>
            <Circle maxHeight={"90px"} maxWidth="90px" overflow="hidden" border="3px solid grey">
                <Image src={props.user_avatar || "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-blonde-avatar-png-image_6514610.png"} alt={props.username} />
            </Circle>
            <Text fontSize="lg" color="red.600" fontWeight="bold">{props.username}</Text>
        </VStack>
    </Box>
  )
}

export default PlayerCard