import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Actions/Auth';
import BGImage from '../../assets/images/bg.jpg';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import {showMessage} from 'react-native-flash-message';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

export default function AudioRecording(props) {
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [path, setPath] = useState('hello.m4a');
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const logoutMethod = () => {
    showMessage({
      message: 'Logged Out',
      description: 'Succfully logged out',
      type: 'danger',
    });
    dispatch(logout());
  };
  const onStartRecord = async () => {
    const path = 'hello.m4a';

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,

      AudioSourceAndroid: AudioSourceAndroidType.MIC,

      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,

      AVNumberOfChannelsKeyIOS: 2,

      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    console.log('audioSet', audioSet);

    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

    audioRecorderPlayer.addRecordBackListener((e) => {
      //  setState({
      //   recordSecs: e.current_position,
      //   recordTime:  audioRecorderPlayer.mmssss(
      //     Math.floor(e.current_position),
      //   ),
      // });
    });

    console.log(`uri: ${uri}`);
  };
  return (
    <ScreenWrapper
      backgroundImage={BGImage}
      statusBarColor={AppColors.transparent}
      barStyle="light-content">
      <View style={styles.mainViewContainer}>
        <Text style={styles.text}>InstaPlayer</Text>

        <Text style={styles.text}>{recordTime}</Text>
        <Button onPress={() => onStartRecord()} title={'RECORD'} />
        <Button
          // onPress={() => this.onStopRecord()}
          title={'onStopRecord'}
        />
        <Text style={styles.text}>
          playTime
          {/* {this.state.playTime} / {this.state.duration} */}
        </Text>
        <Button
          // onPress={() => this.onStartPlay()}
          title={'PLAY'}
        />
        <Button
          // onPress={() => this.onPausePlay()}
          title={'PAUSE'}
        />
        <Button
          //  onPress={() => this.onStopPlay()}
          title={'STOP'}
        />
        <Button title="Logout" onPress={logoutMethod} />
      </View>
    </ScreenWrapper>
  );
}
