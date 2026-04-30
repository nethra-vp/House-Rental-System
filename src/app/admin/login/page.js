import AuthForm from '@/components/AuthForm';

export default function AdminLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <AuthForm role="admin" />
    </div>
  );
}
