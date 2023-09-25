import { Icons } from '@libs/icons-web';
import { Button } from '@libs/ui-web';
import { cn } from '@libs/utils';
import SignUpForm from './sign-up-form';
import { Sign } from 'crypto';
import SignInForm from './sign-in-form';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'signin' | 'signup';
}

const UserAuthForm = ({ className, type, ...props }: UserAuthFormProps) => {
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {type === 'signin' ? <SignInForm /> : <SignUpForm />}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button">
        <Icons.Google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
