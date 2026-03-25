import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = [
  {
    group: "Royal Air Force",
    items: [
      { label: "Pilot", value: "raf-pilot" },
      { label: "Engineer", value: "raf-engineer" },
      { label: "Medic", value: "raf-medic" },
    ],
  },
  {
    group: "Army",
    items: [
      { label: "Infantry Soldier", value: "army-infantry" },
      { label: "Combat Engineer", value: "army-engineer" },
      { label: "Medic", value: "army-medic" },
    ],
  },
];

interface RoleSelectProps {
  onChange: (value: string) => void;
}

export function RoleSelect({ onChange }: RoleSelectProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full bg-zinc-900 border-zinc-700 text-zinc-100 rounded-none h-11 focus:ring-amber-500 focus:border-amber-500">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((group) => (
          <SelectGroup key={group.group}>
            <SelectLabel>{group.group}</SelectLabel>
            {group.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
