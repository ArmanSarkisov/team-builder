import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const Member = ({ email, avatarUrl, firstName, lastName }) => {
    return <Card style={{ margin: '10px 0 10px' }}>
        <Image
            src={ avatarUrl }
            ui={ false }
            wrapped
            style={{ maxHeight: 250, overflow: 'hidden' }}
        />
        <Card.Content>
            <Card.Header>
                <span>{ firstName }</span>
                <span> { lastName }</span>
            </Card.Header>
        </Card.Content>
        <Card.Content extra>
            <a href={ `mailto:${ email }` }>
                <Icon name='user' />
                { email }
            </a>
        </Card.Content>
    </Card>;
};

export default Member;
