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

export function RoleSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full">
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
