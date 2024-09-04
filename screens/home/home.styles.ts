import {StyleSheet} from 'react-native';
import {GlobalColors} from '../../styles/global-colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: GlobalColors.BgColors.Bg1,

    zIndex: 0,
  },
  buttons: {
    width: '100%',
    paddingVertical: 50,
    paddingHorizontal: 20,
    flexDirection: 'column',
    zIndex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 0,
  },
  input: {
    borderColor: GlobalColors.TextColors.white,
    color: GlobalColors.TextColors.white,
  },
});
export default styles;
