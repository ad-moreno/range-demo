import {fixedRangeEndpoint, normalRangeEndpoint} from '../config';
import {type ZodSchema, z} from 'zod';

const getMockedData = async <T extends ZodSchema>(endpoint: string, schema: T): Promise<z.infer<T>> => {
  const response = await fetch(endpoint);
  const rawData = await response.json();
  const data = schema.parse(rawData) as z.infer<typeof schema>;
  return data;
};

const normalRangeDataSchema = z.object({
  min: z.number(),
  max: z.number(),
});

export const getNormalRangeData = () => getMockedData(normalRangeEndpoint, normalRangeDataSchema);

const fixedRangeDataSchema = z.object({
  rangeValues: z.number().array(),
});

export const getFixedRangeData = () => getMockedData(fixedRangeEndpoint, fixedRangeDataSchema);
