import React from 'react'
import {
    Box, HStack
} from '@chakra-ui/react'
import { RoomType, State } from '../constants/constants'
import { useSelector } from 'react-redux'
import PlayerCard from './PlayerCard'

const PlayerList = () => {
    const roomDetails : RoomType = useSelector((store : State) : RoomType => store.roomManager.data)
  return (
    <HStack>
        {
            roomDetails.players?.map((el,i)=><PlayerCard {...el} key={i+1} />)
        }
   </HStack>
  )
}

export default PlayerList