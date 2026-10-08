import { useEffect } from 'react';
import { X, Bookmark, Trash2, Download, Compass, MapPin } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';

interface SavedPlacesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (destId: string) => void;
  onOpenInquiry: (destinationName?: string) => void;
}

export function SavedPlacesDrawer({
  isOpen,
  onClose,
  onSelectDestination,
  onOpenInquiry,
}: SavedPlacesDrawerProps) {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bookmarks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `BharatVeda_Saved_Places_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-foreground/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-surface h-full shadow-2xl border-l border-border flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-border bg-background flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 id="saved-drawer-title" className="font-heading font-extrabold text-base text-foreground">
                Saved Places ({bookmarks.length})
              </h3>
              <span className="text-[11px] text-foreground/60">Saved locally on your device</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved places"
            className="p-1.5 rounded-lg text-foreground/60 hover:text-foreground hover:bg-surface border border-border"
          >
            <X className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {bookmarks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-foreground/60 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center text-foreground/40">
                <Bookmark className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-foreground">No places saved yet.</p>
              <p className="text-xs text-foreground/60 max-w-xs leading-relaxed">
                Click the bookmark button on any destination, hotel, or heritage site to save it to your personal travel notebook.
              </p>
            </div>
          ) : (
            bookmarks.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-background border border-border flex items-start justify-between gap-3 hover:border-primary/40 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-primary/10">
                    {item.category}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-foreground mt-1">
                    {item.name}
                  </h4>
                  <div className="text-xs text-foreground/70 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-accent" aria-hidden="true" />
                    <span>{item.location}</span>
                  </div>
                  <div className="text-[11px] text-foreground/60 line-clamp-1">
                    {item.subtitle}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => removeBookmark(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="p-1.5 text-foreground/40 hover:text-accent rounded hover:bg-surface transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectDestination(item.id);
                      onClose();
                    }}
                    className="text-[11px] font-bold text-primary hover:underline"
                  >
                    Explore →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {bookmarks.length > 0 && (
          <div className="p-4 border-t border-border bg-background space-y-2">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleExportJSON}
                className="px-4 py-2 rounded-xl bg-surface border border-border text-xs font-bold text-foreground hover:bg-border/30 flex items-center gap-1.5 flex-1 justify-center"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Export JSON</span>
              </button>

              <button
                type="button"
                onClick={clearBookmarks}
                className="px-3 py-2 rounded-xl bg-surface border border-border text-xs font-semibold text-foreground/60 hover:text-accent"
              >
                Clear All
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenInquiry('Saved Places Circuit (' + bookmarks.map(b => b.name).join(', ') + ')');
              }}
              className="w-full py-2.5 rounded-xl bg-primary text-surface font-bold text-xs hover:bg-primary-dark transition-colors flex items-center justify-center gap-1.5"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Inquire Trip for Saved Places</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
