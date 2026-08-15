import { Pencil, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Stars } from "@/components/Stars";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addReview, deleteReview, reviewsFor, updateReview, useMarketState } from "@/lib/store";
import { cn } from "@/lib/utils";

function RatingPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Choose a rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          aria-pressed={value === n}
          onClick={() => onChange(n)}
          className="p-1"
        >
          <Star className={cn("size-6", n <= value ? "fill-accent text-accent" : "text-muted-foreground")} />
        </button>
      ))}
    </div>
  );
}

export function ReviewsSection({ targetId }: { targetId: string }) {
  const { reviews, session } = useMarketState();
  const list = reviewsFor(reviews, targetId);
  const author = session?.name ?? "Guest buyer";

  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);

  return (
    <section>
      <h2 className="text-2xl">Reviews ({list.length})</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          addReview(targetId, rating, text.trim(), author);
          setText("");
          setRating(5);
          toast.success("Review posted");
        }}
        className="surface mt-4 space-y-3 p-6"
      >
        <p className="font-semibold">Write a review</p>
        <RatingPicker value={rating} onChange={setRating} />
        <Textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share how the experience went…"
          aria-label="Your review"
        />
        <Button type="submit">Post review</Button>
      </form>

      <div className="mt-4 space-y-4">
        {list.map((r) => (
          <div key={r.id} className="surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{r.author}</p>
              <span className="text-sm text-muted-foreground">{r.date}</span>
            </div>

            {editingId === r.id ? (
              <div className="mt-3 space-y-3">
                <RatingPicker value={editRating} onChange={setEditRating} />
                <Textarea
                  rows={3}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  aria-label="Edit review"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      updateReview(r.id, editRating, editText);
                      setEditingId(null);
                      toast.success("Review updated");
                    }}
                  >
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Stars rating={r.rating} className="mt-1" />
                <p className="mt-2 text-muted-foreground">{r.text}</p>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingId(r.id);
                      setEditText(r.text);
                      setEditRating(r.rating);
                    }}
                  >
                    <Pencil /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      deleteReview(r.id);
                      toast("Review deleted");
                    }}
                  >
                    <Trash2 /> Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        {!list.length && (
          <p className="text-muted-foreground">No reviews yet — be the first to write one.</p>
        )}
      </div>
    </section>
  );
}
