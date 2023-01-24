import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  indicator: {
    paddingTop: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    margin: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    marginTop: 100,
  },
  modalContainer: {
    backgroundColor: '#fff',
    // opacity: 0.7,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  notfound: {
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 18,
  },
});
