/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {resetMatch, watcherScore} from '../../store/actions';
import {calcRun, dynamicSort} from '../../utils';

const Game = () => {
  const dispatch = useDispatch();
  const runs = useSelector(state => state.runs.runs);
  const score = useSelector(state => state.score.score);
  const over = useSelector(state => state.over);
  const batters = useSelector(state => state.batters);
  const striker = batters.batters.filter(
    batter => batter.jerseyNo === batters.striker,
  )[0];
  const nonStriker = batters.batters.filter(
    batter => batter.jerseyNo === batters.nonStriker,
  )[0];
  const wickets = useSelector(state => state.wickets.wickets);
  const matchOver = useSelector(state => state.matchOver.matchOver);
  const results = useSelector(state => state.matchOver.results);

  const getRuns = async () => {
    const gotRun = await calcRun(striker.probability);
    dispatch(watcherScore(gotRun));
  };

  const onReset = () => {
    dispatch(resetMatch());
  };

  const getResult = () => {
    if (score >= 40) {
      return `Bengaluru has won the match by ${4 - wickets} wickets`;
    } else {
      return `Bengaluru has lost the match by ${40 - score} runs`;
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={{width: '40%', paddingLeft: 10}}>
        {item.name} {item.isOnPitch && '*'}
      </Text>
      <Text style={{width: '20%'}}>{item.runs}</Text>
      <Text style={{width: '20%'}}>{item.balls}</Text>
      <Text style={{width: '20%'}}>{item.sr}</Text>
    </View>
  );

  const listHeaderComponent = () => (
    <View style={styles.row}>
      <Text style={{width: '40%', paddingLeft: 10}}>Name</Text>
      <Text style={{width: '20%'}}>Runs</Text>
      <Text style={{width: '20%'}}>Balls</Text>
      <Text style={{width: '20%'}}>S/R</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {!matchOver ? (
        <>
          <View style={styles.scorebox}>
            <View>
              <Text style={styles.sideHeading}>
                Score :{' '}
                <Text style={styles.runs}>
                  {score} - {wickets}
                </Text>
              </Text>
              <Text style={styles.sideHeading}>
                Overs:{' '}
                <Text style={styles.runs}>
                  {over.over}.{over.subOver}
                </Text>
              </Text>
            </View>
            {runs && <Text style={styles.runs}>{String(runs)}</Text>}
          </View>
          <View style={styles.pitch}>
            <Text style={[styles.sideHeading, {fontWeight: '600'}]}>
              {striker.name}* - {striker.runs} ({striker.balls})
            </Text>
            <Text style={[styles.batter2, styles.sideHeading]}>
              {nonStriker.name} - {nonStriker.runs} ({nonStriker.balls})
            </Text>
          </View>
          <TouchableOpacity style={styles.ball} onPress={() => getRuns()}>
            <Image
              source={require('../../assets/ball.png')}
              style={{height: 100, width: 100}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ball, {marginTop: 20}]}
            onPress={() => onReset()}>
            <Image
              source={require('../../assets/reset.png')}
              style={{height: 50, width: 50}}
            />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.centeredContainer}>
          <Text style={styles.result}>{getResult()}</Text>
          <FlatList
            data={results.sort(dynamicSort('inAt')) || []}
            keyExtractor={item => item.jerseyNo}
            renderItem={renderItem}
            ListHeaderComponent={listHeaderComponent}
          />
          <TouchableOpacity
            style={[styles.bowl, {marginTop: 20}]}
            onPress={() => onReset()}>
            <Text>Restart match</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CB050',
  },
  scorebox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  pitch: {
    width: '60%',
    height: '60%',
    borderColor: '#E2B07E',
    borderWidth: 2,
    alignSelf: 'center',
    marginVertical: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E2D1A7',
  },
  batter2: {position: 'absolute', bottom: 10},
  bowl: {
    width: '80%',
    height: 50,
    backgroundColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
    backgroundColor: '#E2D1A7',
  },
  runs: {
    fontSize: 24,
    fontWeight: '600',
  },
  result: {
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 30,
  },
  sideHeading: {
    fontSize: 20,
    fontWeight: '400',
  },
  ball: {
    alignSelf: 'center',
  },
});
