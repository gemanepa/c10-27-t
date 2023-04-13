import { StyleSheet } from 'react-native';

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
    backgroundColor: '#F6F6FD',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#99A3A4',
    paddingVertical: 20,
    backgroundColor: '#EFEEEE',
  },
  startingTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    paddingTop: 40,
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
    fontWeight: 400,
    color: '#334050',
    paddingLeft: 30,
  },
  label: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
