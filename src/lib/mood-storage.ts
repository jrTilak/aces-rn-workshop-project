import AsyncStorage from "@react-native-async-storage/async-storage";

import { MoodEntry, MoodId } from "@/lib/moods";

const STORAGE_KEY = "@aces-app:mood-entries:v1";

type NewMoodEntryInput = {
  moodId: MoodId;
  note: string;
};

/**
 * Reads the real mood list saved from the Home screen.
 */
export async function loadMoodEntries(): Promise<MoodEntry[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as MoodEntry[];
  } catch {
    return [];
  }
}

/**
 * Saves one new mood entry from the Home screen.
 */
export async function saveMoodEntry(
  input: NewMoodEntryInput,
): Promise<MoodEntry[]> {
  const entries = await loadMoodEntries();
  const newEntry: MoodEntry = {
    id: Date.now().toString(),
    moodId: input.moodId,
    note: input.note.trim(),
    createdAt: new Date().toISOString(),
  };
  const nextEntries = [newEntry, ...entries];

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));

  return nextEntries;
}

/**
 * Deletes one mood entry from the real saved list.
 */
export async function deleteMoodEntry(entryId: string): Promise<MoodEntry[]> {
  const entries = await loadMoodEntries();
  const nextEntries = entries.filter((entry) => entry.id !== entryId);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));

  return nextEntries;
}
