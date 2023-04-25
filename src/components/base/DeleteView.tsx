import { Button } from './Button';

export function DeleteView({ type, title }: { type: string; title: string }) {
  return (
    <>
      <h2 className="text-lg font-bold text-secondary-base">Delete this {type}</h2>

      <p className="text-text-muted">
        Are you sure you want to delete the {title} {type}? This action will remove all columns and
        tasks and cannot be reversed.
      </p>

      <div className="flex flex-col gap-3">
        <Button type="danger">Delete</Button>
        <Button type="secondary">Cancel</Button>
      </div>
    </>
  );
}
