import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export const labels = [
  {
    value: 'BUSINESS',
    label: 'Business',
  },
  {
    value: 'PRIVATE',
    label: 'Private',
  },
];

export const statuses = [
  {
    value: 'BOOKED',
    label: 'Booked',
    icon: CheckCircledIcon,
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];
