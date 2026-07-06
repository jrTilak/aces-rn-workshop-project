import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CalendarDays, NotebookPen } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Heading } from "@/components/heading";
import { MoodBreakdown } from "@/components/mood-breakdown";
import { MoodIcon } from "@/components/mood-icon";
import { SmallStatCard } from "@/components/small-stat-card";
import { StatSummaryCard } from "@/components/stat-summary-card";
import { WeekMoodCard } from "@/components/week-mood-card";
import {
  MOODS,
  MoodEntry,
  MoodId,
  calculateMoodStats,
  getMood,
} from "@/lib/moods";
import { COLORS } from "@/theme/colors";

type MockStatsEntry = {
  daysAgo: number;
  time: string;
  moodId: MoodId;
  note: string;
};

const MOCK_STATS_ENTRIES: MockStatsEntry[] = [
  { daysAgo: 0, time: "09:30", moodId: "very_happy", note: "Great morning." },
  { daysAgo: 0, time: "19:15", moodId: "happy", note: "Good meeting." },
  { daysAgo: 1, time: "08:10", moodId: "neutral", note: "Normal day." },
  { daysAgo: 1, time: "21:40", moodId: "sad", note: "Felt tired." },
  { daysAgo: 2, time: "11:20", moodId: "stressed", note: "Too many tasks." },
  { daysAgo: 3, time: "08:45", moodId: "happy", note: "Clear plan." },
  { daysAgo: 4, time: "18:10", moodId: "very_happy", note: "Finished work." },
  { daysAgo: 5, time: "20:05", moodId: "happy", note: "Relaxed evening." },
  { daysAgo: 7, time: "09:00", moodId: "neutral", note: "Routine day." },
  { daysAgo: 8, time: "12:25", moodId: "sad", note: "Low energy." },
  { daysAgo: 9, time: "17:50", moodId: "happy", note: "Nice chat." },
  { daysAgo: 10, time: "10:30", moodId: "stressed", note: "Busy morning." },
];

export default function Stats() {
  const { top } = useSafeAreaInsets();
  const entries = useMemo(() => createMockStatsEntries(), []);
  const stats = useMemo(() => calculateMoodStats(entries), [entries]);
  const maxCount = Math.max(...MOODS.map((mood) => stats.counts[mood.id]), 1);
  const mostCommonMood = stats.mostCommonMood
    ? getMood(stats.mostCommonMood)
    : undefined;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: top + 28 }]}
      showsVerticalScrollIndicator={false}
    >
      <Heading level="screen" style={styles.title}>
        Stats
      </Heading>

      <StatSummaryCard currentStreak={stats.currentStreak} />

      <View style={styles.statGrid}>
        <SmallStatCard
          icon={
            <CalendarDays
              color={COLORS.primary}
              size={26}
              strokeWidth={2.2}
            />
          }
          iconColor={COLORS.iconPurpleSoft}
          label="Longest Streak"
          value={`${stats.longestStreak} days`}
        />

        <SmallStatCard
          icon={
            <NotebookPen
              color={COLORS.success}
              size={26}
              strokeWidth={2.2}
            />
          }
          iconColor={COLORS.moodHappy}
          label="Total Entries"
          value={String(stats.totalEntries)}
        />

        <SmallStatCard
          icon={
            mostCommonMood ? (
              <MoodIcon moodId={mostCommonMood.id} size={48} imageSize={32} />
            ) : null
          }
          iconColor={COLORS.moodSad}
          label="Most Common Mood"
          value={mostCommonMood?.label ?? "None"}
        />
      </View>

      <Heading style={styles.sectionTitle}>This Week</Heading>
      <View style={styles.weekGrid}>
        {stats.week.map((day) => (
          <WeekMoodCard
            key={day.dateKey}
            label={day.label}
            moodId={day.moodId}
          />
        ))}
      </View>

      <Heading style={styles.sectionTitle}>Mood Breakdown</Heading>
      <MoodBreakdown counts={stats.counts} maxCount={maxCount} />
    </ScrollView>
  );
}

/**
 * Mock data used only by the Stats tab.
 * The Home tab still reads and writes real data from AsyncStorage.
 */
function createMockStatsEntries(): MoodEntry[] {
  return MOCK_STATS_ENTRIES.map((entry, index) => {
    const date = new Date();
    const [hours, minutes] = entry.time.split(":").map(Number);

    date.setDate(date.getDate() - entry.daysAgo);
    date.setHours(hours, minutes, 0, 0);

    return {
      id: `mock-${index}`,
      moodId: entry.moodId,
      note: entry.note,
      createdAt: date.toISOString(),
    };
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 28,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 18,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
  },
  sectionTitle: {
    marginBottom: 10,
    marginTop: 24,
  },
  weekGrid: {
    flexDirection: "row",
    gap: 7,
  },
});
