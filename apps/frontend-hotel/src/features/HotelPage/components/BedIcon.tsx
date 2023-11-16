import React from 'react';
import { FaBed } from 'react-icons/fa';

const BedIcon: React.FC<{ className?: string; size?: number }> = ({
  className,
  size = 20,
}) => <FaBed className={className} size={size} />;

export default BedIcon;
