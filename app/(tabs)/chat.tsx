"use client";

import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  MoreVertical,
  Paperclip,
  Camera,
  Mic,
  Smile,
  BadgeCheck,
  Send,
} from "lucide-react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Lorem ipsum dolor sit amet, consectet adipiscing elit. Sed non risus. Suspendisse lectus tortor",
    sender: "other",
    timestamp: "8:32 am",
    status: "read",
  },
  {
    id: "2",
    text: "Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
    sender: "user",
    timestamp: "8:35 am",
    status: "read",
  },
  {
    id: "3",
    text: "Cras elementum ultrices diam. Maecenas ligula massa, varius massa.",
    sender: "other",
    timestamp: "8:36 am",
    status: "read",
  },
  {
    id: "4",
    text: "Lorem ipsum dolor sit amet, consectet adipiscing elit. Sed non risus.",
    sender: "other",
    timestamp: "8:42 am",
    status: "read",
  },
  {
    id: "5",
    text: "dignissim sit amet, adipiscing nec, ultrices sed, dolor. Cras elementum.",
    sender: "user",
    timestamp: "8:46 am",
    status: "read",
  },
  {
    id: "6",
    text: "Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing.",
    sender: "other",
    timestamp: "8:48 am",
    status: "read",
  },
  {
    id: "7",
    text: "Lorem ipsum dolor sit amet, consectet adipiscing elit. Sed non risus.",
    sender: "user",
    timestamp: "8:53 am",
    status: "read",
  },
];

export default function ChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isMounted, setIsMounted] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    console.log("Messages updated, new count:", messages.length);
  }, [messages]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ECE5DD",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: "#075E54",
      paddingTop: Platform.OS === "ios" ? 50 : 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#054d44",
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    backButton: {
      marginRight: 6,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    headerInfo: {
      flex: 1,
    },
    headerName: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "600",
    },
    headerStatus: {
      color: "#fff",
      fontSize: 13,
      opacity: 0.8,
    },
    messageList: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    messageBubble: {
      maxWidth: "80%",
      padding: 8,
      borderRadius: 8,
      marginVertical: 2,
    },
    userMessage: {
      alignSelf: "flex-end",
      backgroundColor: "#DCF8C6",
    },
    otherMessage: {
      alignSelf: "flex-start",
      backgroundColor: "#fff",
    },
    messageText: {
      fontSize: 15,
      color: "#000",
    },
    messageTime: {
      fontSize: 11,
      color: "#7C8B95",
      alignSelf: "flex-end",
      marginTop: 2,
      marginRight: 2,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: "#F0F0F0",
    },
    input: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 8,
      marginRight: 8,
      fontSize: 16,
    },
    inputButtons: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconButton: {
      padding: 4,
    },
    statusContainer: {
      flexDirection: "row",
      marginLeft: 2,
    },
    verifiedIcon: {
      marginLeft: 4,
    },
    footer: {
      backgroundColor: "#F0F0F0",
      marginBottom: 15,
    },
    emojiSelector: {
      height: 250,
    },
  });

  const renderMessageStatus = (status: Message["status"]) => {
    if (status === "read") {
      return (
        <View style={styles.statusContainer}>
          <Check size={16} color="#34B7F1" style={{ marginRight: -12 }} />
          <Check size={16} color="#34B7F1" />
        </View>
      );
    }
    return null;
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Text style={styles.messageTime}>{item.timestamp}</Text>
        {item.sender === "user" && renderMessageStatus(item.status)}
      </View>
    </View>
  );

  const handleEmojiSelected = (emoji: string) => {
    console.log("Selected emoji:", emoji);
    if (isMounted) {
      try {
        setInputMessage((prev) => prev + emoji);
      } catch (error) {
        console.error("Error adding emoji:", error);
      }
    }
  };

  const toggleEmoji = () => {
    try {
      setShowEmoji((prev) => !prev);
    } catch (error) {
      console.error("Error toggling emoji selector:", error);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && isMounted) {
      try {
        const newMessage: Message = {
          id: String(Date.now()),
          text: inputMessage.trim(),
          sender: "user",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "sent",
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");
        setShowEmoji(false); // Close emoji selector after sending
      } catch (error) {
        console.error("Error in handleSendMessage:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20at%2014.46.05-rt4duFaT1tmb7UKhAmVJP6vGy2BA2B.png",
            }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.headerName}>Kumaran</Text>
              <BadgeCheck
                size={16}
                color="#34B7F1"
                style={styles.verifiedIcon}
              />
            </View>
            <Text style={styles.headerStatus}>online</Text>
          </View>
        </View>
        <TouchableOpacity style={{ padding: 8 }}>
          <MoreVertical color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleEmoji}>
            <Smile color="#666" size={24} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Type a message"
            placeholderTextColor="#666"
          />
          <View style={styles.inputButtons}>
            {inputMessage.length === 0 ? (
              <>
                <TouchableOpacity style={styles.iconButton}>
                  <Paperclip color="#666" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Camera color="#666" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Mic color="#075E54" size={24} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleSendMessage}
              >
                <Send color="#075E54" size={24} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {showEmoji && (
        <View style={styles.emojiSelector}>
          <EmojiSelector
            category={Categories.emotion}
            onEmojiSelected={handleEmojiSelected}
            columns={10}
            showSearchBar={true}
            showSectionTitles={false}
            showHistory={true}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
