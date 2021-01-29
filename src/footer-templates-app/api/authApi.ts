export function signIn({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  return { email, password };
}
