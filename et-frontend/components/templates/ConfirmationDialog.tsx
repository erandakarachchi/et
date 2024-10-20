import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
  confirmButtonText: string;
};

const ConfirmationDialog = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={props.onConfirm}>{props.confirmButtonText}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
