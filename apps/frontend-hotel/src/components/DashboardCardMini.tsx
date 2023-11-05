import {Card, CardContent, CardHeader, CardTitle} from '@libs/ui-web';

const DashboardCardMini = ({title, amount, amountLong, icon}) => {
  return (
  <Card className="flex-col flex-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm, font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{amount}</div>
      <p className="text-xs text-muted-foreground">{amountLong}</p>
    </CardContent>
  </Card>
  );
};

export default DashboardCardMini;
