import { createFileRoute } from "@tanstack/react-router";
import { Camera, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { SectionHeading } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/seller/profile")({
  head: () => ({
    meta: [
      { title: "Seller profile | SilverHands" },
      {
        name: "description",
        content: "Build a profile that shows your experience, languages and craft.",
      },
      { property: "og:title", content: "Seller profile | SilverHands" },
      { property: "og:description", content: "Show buyers your experience, languages and craft." },
    ],
  }),
  component: SellerProfile,
});

function SellerProfile() {
  return (
    <div className="max-w-3xl">
      <SectionHeading eyebrow="Your story" title="Seller profile" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Profile updated");
        }}
        className="surface space-y-7 p-8 lg:p-10"
      >
        <div className="flex flex-wrap items-center gap-5">
          <span className="grid size-24 place-items-center rounded-full bg-primary-soft text-primary">
            <Camera className="size-8" aria-hidden />
          </span>
          <Button type="button" variant="outline">
            Upload profile photo
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sname">Name</Label>
            <Input id="sname" defaultValue="Anjali Sen" className="h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slang">Languages</Label>
            <Input id="slang" defaultValue="Bengali, Hindi, English" className="h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sloc">Location</Label>
            <Input id="sloc" defaultValue="Salt Lake, Kolkata" className="h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sexp">Experience</Label>
            <Input id="sexp" defaultValue="38 years of home cooking" className="h-12 rounded-xl" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sskills">Skills</Label>
          <Input id="sskills" defaultValue="Bengali cuisine, pickling, tiffin planning" className="h-12 rounded-xl" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sabout">About me</Label>
          <Textarea
            id="sabout"
            rows={5}
            className="rounded-xl"
            defaultValue="Thirty-eight years of cooking for family — now cooking for my neighbourhood."
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => toast("Hansa AI suggested a warmer opening line")}
          >
            <Sparkles /> Improve bio with AI
          </Button>
        </div>

        <Button type="submit" size="lg">
          Save profile
        </Button>
      </form>
    </div>
  );
}
