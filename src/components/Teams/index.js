import React from 'react';
import { Container } from 'semantic-ui-react';

// components
import Team from './Team';


const Teams = ({ teams }) => {
    return <Container style={{ padding: '50px 0' }}>
        { teams.map(team => {
            return <Team
                key={ team.id }
                name={team.name}
                members={team.members}
                project={team.project}
                topic={team.topic}
            />;
        }) }
    </Container>;
};


export default Teams;
