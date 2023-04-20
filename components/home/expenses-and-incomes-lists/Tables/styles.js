import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6FD',
    paddingTop: 24,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
    backgroundColor: '#F6F6FD',
  },
  tableRowContainer: {
    flex: 1,
    paddingHorizontal: 26,
    backgroundColor: '#EFEEEE',
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
    flex: 1,
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
    textAlign: 'left',
    paddingHorizontal: 28,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#334050',
    fontFamily: 'ubuntu-regular',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    letterSpacing: -0.3,
  },
  amountCell: {
    textAlign: 'right',
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
    left: 100,
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
