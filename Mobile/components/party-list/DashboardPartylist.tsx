
import { Feather } from '@expo/vector-icons'
import React, { FC } from 'react'
import { PartyList } from '../../Models/Partylist'
import DefaultListView from '../lists/DefaultListView'

type Props = {
    partylist: PartyList
    callback: Function
}
const DashboardPartylist: FC<Props> = ( props ) => {

    return (
        <DefaultListView
            callback={() => props.callback()}
            title={props.partylist.acronym}
            icon={<Feather name="users"
                size={24}
                color="orange"
            />}
        />
    )
}

export default DashboardPartylist
