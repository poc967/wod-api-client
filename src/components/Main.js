import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getWods } from '../actions/wodActions';
import { Card, Button, Elevation, Spinner } from '@blueprintjs/core';
import DisplayEditor from './DisplayEditor/DisplayEditor';

const Wrapper = styled.div`
  padding-top: 1rem;
  width: 60vw;
  height: 100vh;
  margin-left: 4rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 1.125rem;
`;

const WorkoutBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding-top: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgb(16 22 26 / 10%), 0 2px 4px rgb(16 22 26 / 20%),
    0 8px 24px rgb(16 22 26 / 20%);

  ul {
    font-size: medium;
  }

  ul li {
    padding: 5px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 15px;
`;

const calcDate = () => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  let today = new Date().toLocaleDateString('en-US', options);
  return today;
};
const Main = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWods());
  }, [dispatch]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Button icon="chevron-left" minimal={true} />
        <Title>{calcDate()}</Title>
        <Button icon="chevron-right" minimal={true} />
      </TitleWrapper>
      {props.wods.fetchingWods ? (
        <Spinner size="100" intent="success" />
      ) : (
        <div className="bp3-skeleton">
          {props.wods.wods.map((wod) =>
            wod.work_outs.map((work_out) => (
              <WorkoutBox>
                {work_out.title ? <h1>{work_out.title}</h1> : null}
                <DisplayEditor rawContent={JSON.parse(work_out.description)} />
                <Button icon="edit" minimal={true} />
              </WorkoutBox>
            ))
          )}
        </div>
      )}
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
