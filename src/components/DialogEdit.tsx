import { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Wand2 } from "lucide-react";
import { Button } from "~/components/ui/button";

const DialogEdit = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute right-5 top-5 hidden group-hover:flex"
          variant="outline"
        >
          <Wand2 /> <p className="p-[0.3rem]">Edit with AI</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit with AI</DialogTitle>
          <DialogDescription>
            Select the option you want and let the AI give you tailored answers
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Button type="submit">
              Extrapolate this data with latest research till 2023
            </Button>
            <Button type="submit">
              Expand the answer to understand with ease
            </Button>
            <Button type="submit">Explain this data in less words</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEdit;
