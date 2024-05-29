export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>
  );
}
