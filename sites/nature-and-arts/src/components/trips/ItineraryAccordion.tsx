import { useState } from 'preact/hooks';

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export default function ItineraryAccordion({ days, dayLabel }: { days: ItineraryDay[]; dayLabel: string }) {
  const [openDay, setOpenDay] = useState<number | null>(days[0]?.day ?? null);

  return (
    <div class="divide-y divide-ink-700 border-y border-ink-700">
      {days.map((entry) => {
        const isOpen = openDay === entry.day;
        const panelId = `itinerary-panel-${entry.day}`;
        const buttonId = `itinerary-button-${entry.day}`;
        return (
          <div key={entry.day}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenDay(isOpen ? null : entry.day)}
                class="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span class="flex items-baseline gap-3">
                  <span class="font-display text-sm text-terracotta-400">
                    {dayLabel} {entry.day}
                  </span>
                  <span class="text-paper-50">{entry.title}</span>
                </span>
                <span class="shrink-0 text-sand-300" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              class="pb-4 text-sm text-stone-400"
            >
              {entry.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
