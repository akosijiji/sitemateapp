import {Platform, StyleSheet} from 'react-native';

const boxShadow: any = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  android: {elevation: 6},
});

export default StyleSheet.create({
  container: {
    height: 240,
    marginBottom: 18,
    backgroundColor: '#eee',
    borderRadius: 15,
    marginHorizontal: 16,
    ...boxShadow,
  },
  imageContainer: {flex: 1},
  image: {
    flex: 1,
    borderRadius: 15,
    height: 300,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    textAlign: 'center',
    backgroundColor: 'black',
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 15,
    color: '#fff',
    paddingBottom: 15,
    padding: 10,
  },
  timestamp: {
    position: 'absolute',
    color: '#eee',
    fontSize: 12,
    fontWeight: '300',
    right: 16,
    bottom: 8,
  },
});
