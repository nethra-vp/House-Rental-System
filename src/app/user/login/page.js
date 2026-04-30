import AuthForm from '@/components/AuthForm';

export default function UserLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <AuthForm role="user" />
    </div>
  );
}
