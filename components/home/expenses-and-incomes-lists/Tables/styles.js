import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6FD',
    paddingTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    paddingBottom: 16,
    backgroundColor: '#F6F6FD',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#99A3A4',
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#EFEEEE',
    alignItems: 'center',
  },
  startingTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#99A3A4',
    backgroundColor: '#EFEEEE',
    paddingBottom: 16,
    paddingTop: 50,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#334050',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#334050',
    paddingLeft: 60,
    fontFamily: 'ubuntu-regular',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    letterSpacing: -0.3,
  },
  amountCell: {
    fontWeight: 700,
    fontFamily: 'ubuntu-bold',
  },
  label: {
    position: 'absolute',
    top: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01B496',
    width: 150,
    left: (Dimensions.get('window').width - 150) / 2,
    right: (Dimensions.get('window').width - 150) / 2,
    borderRadius: 10,
    height: 24,
  },
  labelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 400,
    fontFamily: 'ubuntu-regular',
  },
  imageItemContainer: {
    width: 24,
    height: 23,
    backgroundColor: '#d9d9d9',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
});

export default styles;
