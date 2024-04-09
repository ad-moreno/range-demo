import DataRange from '../../components/DataRange';
import {getNormalRangeData} from '../../content/hooks';

const Exercise1 = async () => {
  const data = await getNormalRangeData();
  return <DataRange title="Normal Range" data={data} />;
};

export default Exercise1;
