// Simulated diarization utility for combining user and AI transcripts
export class DiarizationSimulator {
  constructor() {
    this.conversationHistory = [];
  }

  // Add a user message to the conversation
  addUserMessage(text, timestamp) {
    this.conversationHistory.push({
      speaker: 'User',
      text: text,
      timestamp: timestamp,
      type: 'user'
    });
  }

  // Add an AI message to the conversation
  addAIMessage(text, timestamp) {
    this.conversationHistory.push({
      speaker: 'AI Agent',
      text: text,
      timestamp: timestamp,
      type: 'ai'
    });
  }

  // Get the complete diarized transcript
  getDiarizedTranscript() {
    return this.conversationHistory.map(entry => ({
      speaker: entry.speaker,
      text: entry.text,
      timestamp: entry.timestamp,
      type: entry.type
    }));
  }

  // Get the latest conversation segment (last user + AI exchange)
  getLatestSegment() {
    const lastUserIndex = this.conversationHistory.findLastIndex(entry => entry.type === 'user');
    const lastAIIndex = this.conversationHistory.findLastIndex(entry => entry.type === 'ai');
    
    if (lastUserIndex === -1 || lastAIIndex === -1) {
      return [];
    }

    const startIndex = Math.min(lastUserIndex, lastAIIndex);
    return this.conversationHistory.slice(startIndex);
  }

  // Format transcript for display
  formatTranscript() {
    return this.conversationHistory.map(entry => {
      const time = new Date(entry.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      
      return {
        speaker: entry.speaker,
        text: entry.text,
        timestamp: entry.timestamp,
        formattedTime: time,
        type: entry.type
      };
    });
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }
} 