import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import PropTypes from 'prop-types';

function PieChartWithCenteredLabels({ tableData }) {
  const Labels = ({ slices }) =>
    slices.map((slice, index) => {
      const { pieCentroid, data: sliceData } = slice;

      const tooLittleSpace = slices.length > 6 && sliceData.percentage < 7;
      return (
        <Text
          key={JSON.stringify([index, sliceData.amount])}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={slices.length > 5 ? 8 : 10}
          stroke="white"
          strokeWidth={1}
        >
          {tooLittleSpace ? '' : `${sliceData.percentage}%`}
        </Text>
      );
    });

  return (
    <PieChart
      style={{ height: 170 }}
      valueAccessor={({ item }) => item.percentage}
      data={tableData}
      spacing={0}
      outerRadius="100%"
      innerRadius="2%"
    >
      <Labels />
    </PieChart>
  );
}

PieChartWithCenteredLabels.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PieChartWithCenteredLabels;
