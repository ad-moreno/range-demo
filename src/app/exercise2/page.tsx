import DataRange from '../../components/DataRange';
import {getFixedRangeData} from '../../content/hooks';

const Exercise2 = async () => {
  const data = await getFixedRangeData();
  return <DataRange title="Fixed Range" data={data} />;
};

export default Exercise2;
