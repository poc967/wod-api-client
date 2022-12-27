import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWods } from '../actions/wodActions';

// components
import Button1 from './Button1';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding-top: 1rem;
  width: 95%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 1.125rem;
`;

const WorkoutBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 95vw;
  margin: 0 auto;
  border: solid black 1px;
  margin-top: 15px;
  padding-top: 15px;

  ul {
    font-size: medium;
    font-weight: 200;
  }

  ul li {
    padding: 5px;
  }
`;

const Description = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
`;

let mockWorkOutData = {
  title: 'test title',
  date: null,
  work_outs: [
    {
      id: '62f7196b980d371bb834fc81',
      description: 'AMRAP 10',
      is_deleted: false,
      movements: [
        {
          movement: {
            id: '62f7131f441f080786bcf621',
            name: 'wall balls',
            is_deleted: false,
            created: 'Fri Aug 12 22:57:34 2022',
          },
          repititions: '20',
          sets: null,
          weight: '20/14',
          notes: null,
        },
        {
          movement: {
            id: '62f7131f441f080786bcf621',
            name: 'Snatch',
            is_deleted: false,
            created: 'Fri Aug 12 22:57:34 2022',
          },
          repititions: '5',
          sets: null,
          weight: '135/95#',
          notes: null,
        },
        {
          movement: {
            id: '62f7131f441f080786bcf621',
            name: 'Burpees',
            is_deleted: false,
            created: 'Fri Aug 12 22:57:34 2022',
          },
          repititions: '10',
          sets: null,
          weight: null,
          notes: null,
        },
      ],
      notes: 'unbroken',
      created: 'Fri Aug 12 23:24:25 2022',
    },
    {
      id: '62f7196b980d371bb834fc81',
      description: 'EMOM 15',
      is_deleted: false,
      movements: [
        {
          movement: {
            id: '62f7131f441f080786bcf621',
            name: 'Snatch',
            is_deleted: false,
            created: 'Fri Aug 12 22:57:34 2022',
          },
          repititions: '1',
          sets: null,
          weight: null,
          notes: null,
        },
      ],
      notes: 'unbroken',
      created: 'Fri Aug 12 23:24:25 2022',
    },
  ],
};

const calcDate = () => {
  let today = new Date().toDateString();
  return today;
};
class Main extends Component {
  async componentDidMount() {
    await this.props.getWods();
  }

  render() {
    return (
      <Wrapper>
        <Title>{calcDate()}</Title>
        {console.log(this.props.wods.wods)}
        {this.props.wods.fetchingWods ? (
          <span>loading...</span>
        ) : (
          this.props.wods.wods[0].work_outs.map((work_out) => (
            <WorkoutBox>
              <Description>{work_out.description}</Description>
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                {work_out.movements.map((movement) => (
                  <li>
                    {movement.repititions} {movement.movement.name}{' '}
                    {movement.weight ? `(${movement.weight})` : null}
                  </li>
                ))}
              </ul>
            </WorkoutBox>
          ))
        )}
        <ButtonContainer>
          <Button1 text="New Workout" />
          <Button1 text="Whiteboard" />
          <Button1 text="Feed" />
        </ButtonContainer>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  wods: state.wod,
});

Main.propTypes = {
  wods: PropTypes.object,
  getWods: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getWods })(Main);
