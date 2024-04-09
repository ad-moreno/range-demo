import {QueryKey, useQuery} from '@tanstack/react-query';
import {fixedRangeEndpoint, normalRangeEndpoint} from '../config';
import {ZodSchema, z} from 'zod';

const useMockedData = <T = unknown>(queryKey: QueryKey, endpoint: string, schema: ZodSchema) => {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(endpoint);
      const rawData = await response.json();
      const data = schema.parse(rawData);
      return data;
    },
  });
};

export const NORMAL_RANGE_QUERY_KEY = 'normal-range';

const normalRangeDataSchema = z.object({
  min: z.number(),
  max: z.number(),
});

export type NormalRangeData = z.infer<typeof normalRangeDataSchema>;

export const useNormalRangeData = () =>
  useMockedData<NormalRangeData>([NORMAL_RANGE_QUERY_KEY], normalRangeEndpoint, normalRangeDataSchema);

export const FIXED_RANGE_QUERY_KEY = 'fixed-range';

const fixedRangeDataSchema = z.object({
  rangeValues: z.number().array(),
});

export type FixedRangeData = z.infer<typeof fixedRangeDataSchema>;

export const useFixedRangeData = () =>
  useMockedData<FixedRangeData>([FIXED_RANGE_QUERY_KEY], fixedRangeEndpoint, fixedRangeDataSchema);
