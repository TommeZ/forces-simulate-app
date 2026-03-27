interface StatusMessageProps {
  name: string;
  role: string;
  file: File | null;
}

export function StatusMessage({ name, role, file }: StatusMessageProps) {
  const message = () => {
    if (!name && !role && !file) return "Complete all fields to continue";
    if (name && !role) return "Select a role";
    if (name && role && !file) return "Upload a photo";
    if (name && role && file) return "Ready to deploy →";
  };

  return <p className="text-xs text-zinc-600">{message()}</p>;
}
