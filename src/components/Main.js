import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, useDispatch } from 'react-redux';
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

const calcDate = () => {
  let today = new Date().toDateString();
  return today;
};
const Main = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWods());
  }, []);

  return (
    <Wrapper>
      <Title>{calcDate()}</Title>
      {props.wods.fetchingWods ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        props.wods.wods.map((wod) =>
          wod.work_outs.map((work_out) => (
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
        )
      )}
      <ButtonContainer>
        <Button1 text="New Workout" />
        <Button1 text="Whiteboard" />
        <Button1 text="Feed" />
      </ButtonContainer>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  wods: state.wod,
});

Main.propTypes = {
  wods: PropTypes.object,
  getWods: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getWods })(Main);
