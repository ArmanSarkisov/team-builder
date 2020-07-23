import React from 'react';
import { Card } from 'semantic-ui-react';
import Member from './Member';


const Team = ({ name, topic, project, members }) => {
    return <Card  style={{ width: '100%' }}>
        <Card.Content>
            <Card.Header>
                <span>{ name }</span>
            </Card.Header>
            <Card.Content extra>
                <Card.Description>
                    Topic { topic }
                </Card.Description>
                <Card.Description>
                    Project { project }
                </Card.Description>
            </Card.Content>
        </Card.Content>
        <div style={ { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' } }>
            { members.map(member => {
                return <Member
                    key={member.email}
                    email={member.email}
                    avatarUrl={member.avatarUrl}
                    firstName={member.firstName}
                    lastName={member.lastName}
                />
            }) }
        </div>
    </Card>
};


export default Team;
