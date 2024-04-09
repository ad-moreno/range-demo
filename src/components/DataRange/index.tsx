import Range, {type RangeMinMaxProps, type RangeValuesProps} from '../Range';
import {type ComponentProps} from 'react';

import styles from './styles.module.css';
import classNames from 'classnames';

type Props = ComponentProps<'div'> & {
  title: string;
  data: RangeMinMaxProps | RangeValuesProps;
};

/**
 * DataRange is a React component that displays the minimum and maximum values of a data range.
 * @param title Title of the component.
 * @param query The query prop should be used to fetch the minimum and maximum or range values from an API endpoint.
 */
const DataRange = ({title, data, className, ...props}: Props) => {
  return (
    <div className={classNames(styles.container, className)} {...props}>
      <div className={styles.title}>{title}</div>
      <Range {...data} />
    </div>
  );
};

export default DataRange;
