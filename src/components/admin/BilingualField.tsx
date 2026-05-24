import { Label, FieldGroup, HelperText } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/cn";

interface BilingualFieldProps {
  label: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  valueId: string;
  valueEn: string;
  onChangeId: (value: string) => void;
  onChangeEn: (value: string) => void;
  errorId?: string;
  errorEn?: string;
  helperText?: string;
  className?: string;
  idPrefix: string;
}

export function BilingualField({
  label,
  required,
  multiline,
  rows = 4,
  valueId,
  valueEn,
  onChangeId,
  onChangeEn,
  errorId,
  errorEn,
  helperText,
  className,
  idPrefix,
}: BilingualFieldProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      <FieldGroup>
        <Label htmlFor={`${idPrefix}-id`} required={required}>
          {label} <span className="font-mono text-mono-xs text-pmd-gold-700 dark:text-pmd-gold-400 ml-1">ID</span>
        </Label>
        {multiline ? (
          <Textarea
            id={`${idPrefix}-id`}
            rows={rows}
            value={valueId}
            onChange={(e) => onChangeId(e.target.value)}
            variant={errorId ? "error" : "default"}
          />
        ) : (
          <Input
            id={`${idPrefix}-id`}
            value={valueId}
            onChange={(e) => onChangeId(e.target.value)}
            variant={errorId ? "error" : "default"}
          />
        )}
        {errorId && <HelperText tone="error">{errorId}</HelperText>}
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor={`${idPrefix}-en`} required={required}>
          {label} <span className="font-mono text-mono-xs text-pmd-gold-700 dark:text-pmd-gold-400 ml-1">EN</span>
        </Label>
        {multiline ? (
          <Textarea
            id={`${idPrefix}-en`}
            rows={rows}
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            variant={errorEn ? "error" : "default"}
          />
        ) : (
          <Input
            id={`${idPrefix}-en`}
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            variant={errorEn ? "error" : "default"}
          />
        )}
        {errorEn && <HelperText tone="error">{errorEn}</HelperText>}
      </FieldGroup>
      {helperText && (
        <HelperText className="col-span-full">{helperText}</HelperText>
      )}
    </div>
  );
}
