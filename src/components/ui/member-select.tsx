import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Member {
  value: string;
  label: string;
}

interface MemberSelectProps {
  members: Member[];
  selectedMembers: string[];
  onSelect: (members: string[]) => void;
}

export function MemberSelect({
  members,
  selectedMembers,
  onSelect,
}: MemberSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleMember = (value: string) => {
    const newSelection = selectedMembers.includes(value)
      ? selectedMembers.filter((id) => id !== value)
      : [...selectedMembers, value];
    onSelect(newSelection);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedMembers.length > 0
            ? `${selectedMembers.length} members selected`
            : "Select members..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search members..." />
          <CommandEmpty>No members found.</CommandEmpty>
          <CommandGroup>
            {members.map((member) => (
              <CommandItem
                key={member.value}
                onSelect={() => toggleMember(member.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedMembers.includes(member.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {member.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
