import React from 'react';
import styles from './index.less';

export type FieldProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  style?: React.CSSProperties;
};

const Field: React.FC<FieldProps> = ({ label, value, unit, ...rest }) => {
  return (
    <div className={styles.field} {...rest}>
      <span className={styles.label}>{label + ':'}</span>
      <span className={styles.number}>{value}</span>
      {unit ? <span className={styles.unit}>{'(' + unit + ')'}</span> : null}
    </div>
  );
};

export default Field;
