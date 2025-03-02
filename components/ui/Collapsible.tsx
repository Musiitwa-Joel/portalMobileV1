import { PropsWithChildren, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface CollapsibleProps extends PropsWithChildren {
  title: string;
  defaultExpanded?: boolean;
  index: number;
  expandedIndex: number;
  onToggle: (index: number) => void;
}

export function Collapsible({
  children,
  title,
  defaultExpanded = false,
  index,
  expandedIndex,
  onToggle,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const theme = useColorScheme() ?? "light";

  useEffect(() => {
    setIsOpen(index === expandedIndex);
  }, [index, expandedIndex]);

  const handleToggle = () => {
    onToggle(index);
  };

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={handleToggle}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <ThemedText style={styles.h1} type="defaultSemiBold">
          {title}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: -10,
    marginRight: -10,
  },
  h1: {
    fontFamily: "SharpSansBold",
  },
});
