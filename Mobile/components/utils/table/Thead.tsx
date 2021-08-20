
import React, { FC } from 'react';
import Column from './Column';
import Row from './Row';

type Props = {
    headers?: any[] | any
};

const Thead: FC<Props> = ( props ) => {
    return (
        <Row>
            {
                props.headers.map( ( title: string, index: number ) => (
                    <Column key={index}>
                        {title}
                    </Column>
                ) )
            }
        </Row>
    );
};

export default Thead;
