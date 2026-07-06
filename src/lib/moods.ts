import { COLORS } from "@/theme/colors";

export const MOODS = [
  {
    id: "very_happy",
    label: "Very Happy",
    image: require("@/images/emoji/very-happy.png"),
    tint: COLORS.moodVeryHappy,
    softTint: COLORS.moodVeryHappySoft,
  },
  {
    id: "happy",
    label: "Happy",
    image: require("@/images/emoji/happy.png"),
    tint: COLORS.moodHappy,
    softTint: COLORS.moodHappySoft,
  },
  {
    id: "neutral",
    label: "Neutral",
    image: require("@/images/emoji/neutral.png"),
    tint: COLORS.moodNeutral,
    softTint: COLORS.moodNeutralSoft,
  },
  {
    id: "sad",
    label: "Sad",
    image: require("@/images/emoji/sad.png"),
    tint: COLORS.moodSad,
    softTint: COLORS.moodSadSoft,
  },
  {
    id: "stressed",
    label: "Stressed",
    image: require("@/images/emoji/very-sad.png"),
    tint: COLORS.moodStressed,
    softTint: COLORS.moodStressedSoft,
  },
] as const;

export type MoodOption = (typeof MOODS)[number];
export type MoodId = MoodOption["id"];

export type MoodEntry = {
  id: string;
  moodId: MoodId;
  note: string;
  createdAt: string;
};

export type MoodCounts = Record<MoodId, number>;

export type WeekMood = {
  label: string;
  dateKey: string;
  moodId?: MoodId;
};

export type MoodStats = {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
  mostCommonMood?: MoodId;
  counts: MoodCounts;
  week: WeekMood[];
};

export const MOOD_BY_ID = MOODS.reduce(
  (acc, mood) => {
    acc[mood.id] = mood;
    return acc;
  },
  {} as Record<MoodId, MoodOption>,
);

/**
 * Creates a zero count for every mood.
 * This gives the stats screen a predictable object shape.
 */
export function createMoodCounts(): MoodCounts {
  return {
    very_happy: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    stressed: 0,
  };
}

/**
 * Checks if a value is one of the mood ids the app supports.
 */
export function isMoodId(value: unknown): value is MoodId {
  return typeof value === "string" && value in MOOD_BY_ID;
}

/**
 * Finds the full mood config for a mood id.
 */
export function getMood(moodId: MoodId): MoodOption {
  return MOOD_BY_ID[moodId];
}

/**
 * Sorts newest entries first.
 */
export function compareEntriesDesc(a: MoodEntry, b: MoodEntry): number {
  return (
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Returns the beginning of a date in the user's local timezone.
 */
export function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Adds or removes days from a date.
 */
export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/**
 * Turns a date into a simple YYYY-MM-DD key for grouping and streaks.
 */
export function dayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Turns a YYYY-MM-DD key back into a local Date.
 */
export function dateFromDayKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Formats a saved entry date for the history section heading.
 */
export function formatDateHeader(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

/**
 * Formats a saved entry date as a readable time.
 */
export function formatEntryTime(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

/**
 * Groups entries by date so the home screen can render one card per day.
 */
export function groupMoodEntriesByDate(entries: MoodEntry[]) {
  return entries.reduce<{ key: string; title: string; data: MoodEntry[] }[]>(
    (groups, entry) => {
      const key = dayKey(new Date(entry.createdAt));
      const existing = groups.find((group) => group.key === key);

      if (existing) {
        existing.data.push(entry);
        return groups;
      }

      groups.push({
        key,
        title: formatDateHeader(entry.createdAt),
        data: [entry],
      });

      return groups;
    },
    [],
  );
}

/**
 * Calculates all stats shown on the Stats tab from the saved entries.
 */
export function calculateMoodStats(
  entries: MoodEntry[],
  now = new Date(),
): MoodStats {
  const sortedEntries = [...entries].sort(compareEntriesDesc);
  const counts = createMoodCounts();
  const entryByDay = new Map<string, MoodEntry>();
  const dayKeys = new Set<string>();

  for (const entry of sortedEntries) {
    counts[entry.moodId] += 1;

    const key = dayKey(new Date(entry.createdAt));
    dayKeys.add(key);

    if (!entryByDay.has(key)) {
      entryByDay.set(key, entry);
    }
  }

  const mostCommonMood = MOODS.reduce<MoodId | undefined>((best, mood) => {
    if (!best || counts[mood.id] > counts[best]) {
      return mood.id;
    }

    return best;
  }, undefined);

  const currentStreak = getCurrentStreak(dayKeys, now);
  const longestStreak = getLongestStreak([...dayKeys]);
  const week = getWeekMoodEntries(entryByDay, now);

  return {
    currentStreak,
    longestStreak,
    totalEntries: entries.length,
    mostCommonMood,
    counts,
    week,
  };
}

/**
 * Counts how many days in a row have at least one entry, starting today.
 */
function getCurrentStreak(keys: Set<string>, now: Date): number {
  let streak = 0;
  let cursor = startOfLocalDay(now);

  while (keys.has(dayKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

/**
 * Finds the longest run of consecutive days with at least one entry.
 */
function getLongestStreak(keys: string[]): number {
  if (keys.length === 0) {
    return 0;
  }

  const sortedKeys = [...keys].sort();
  let longest = 1;
  let current = 1;

  for (let index = 1; index < sortedKeys.length; index += 1) {
    const previous = dateFromDayKey(sortedKeys[index - 1]);
    const nextExpected = dayKey(addDays(previous, 1));

    if (sortedKeys[index] === nextExpected) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

/**
 * Picks the latest mood for each day in the current Monday-Sunday week.
 */
function getWeekMoodEntries(
  entryByDay: Map<string, MoodEntry>,
  now: Date,
): WeekMood[] {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = startOfLocalDay(now);
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = addDays(today, -daysSinceMonday);

  return labels.map((label, index) => {
    const date = addDays(monday, index);
    const key = dayKey(date);

    return {
      label,
      dateKey: key,
      moodId: entryByDay.get(key)?.moodId,
    };
  });
}
