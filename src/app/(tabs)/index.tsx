import { useCallback, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Heading } from "@/components/heading";
import { MoodHistory } from "@/components/mood-history";
import { MoodOption } from "@/components/mood-option";
import { NotesInput } from "@/components/notes-input";
import { SaveMoodButton } from "@/components/save-mood-button";
import { MOODS, MoodEntry, MoodId, formatEntryTime, getMood } from "@/lib/moods";
import {
  deleteMoodEntry,
  loadMoodEntries,
  saveMoodEntry,
} from "@/lib/mood-storage";
import { COLORS } from "@/theme/colors";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodId>("neutral");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Reloads moods whenever the Home tab becomes active.
   * That keeps this screen in sync after visiting the Stats tab.
   */
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      setIsLoading(true);
      loadMoodEntries()
        .then((loadedEntries) => {
          if (isActive) {
            setEntries(loadedEntries);
          }
        })
        .catch(() => {
          if (isActive) {
            Alert.alert("Could not load moods", "Please try again.");
          }
        })
        .finally(() => {
          if (isActive) {
            setIsLoading(false);
          }
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  /**
   * Saves the selected mood and note to AsyncStorage.
   */
  async function handleSaveMood() {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const nextEntries = await saveMoodEntry({
        moodId: selectedMood,
        note,
      });
      setEntries(nextEntries);
      setNote("");
      setSelectedMood("neutral");
      Keyboard.dismiss();
    } catch {
      Alert.alert("Could not save mood", "Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  /**
   * Shows entry details and lets the user delete that entry.
   */
  function handleEntryPress(entry: MoodEntry) {
    const mood = getMood(entry.moodId);
    const noteText = entry.note.length > 0 ? entry.note : "No note added.";

    Alert.alert(
      mood.label,
      `${formatEntryTime(entry.createdAt)}\n\n${noteText}`,
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const nextEntries = await deleteMoodEntry(entry.id);
              setEntries(nextEntries);
            } catch {
              Alert.alert("Could not delete mood", "Please try again.");
            }
          },
        },
        { text: "Close", style: "cancel" },
      ],
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardRoot}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingTop: top + 22 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Heading level="screen" style={styles.heading}>
          How are you feeling today?
        </Heading>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moodSelector}
        >
          {MOODS.map((mood) => (
            <MoodOption
              isSelected={selectedMood === mood.id}
              key={mood.id}
              mood={mood}
              onPress={() => setSelectedMood(mood.id)}
            />
          ))}
        </ScrollView>

        <NotesInput onChangeText={setNote} value={note} />
        <SaveMoodButton isSaving={isSaving} onPress={handleSaveMood} />

        <View style={styles.historyDivider} />
        <MoodHistory
          entries={entries}
          isLoading={isLoading}
          onEntryPress={handleEntryPress}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardRoot: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  heading: {
    marginBottom: 18,
  },
  moodSelector: {
    gap: 10,
    paddingBottom: 22,
  },
  historyDivider: {
    backgroundColor: COLORS.border,
    height: 1,
    marginHorizontal: -18,
    marginTop: 22,
  },
});
