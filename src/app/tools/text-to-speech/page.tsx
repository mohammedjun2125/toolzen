import type { Metadata } from 'next';
import TextToSpeech from '@/components/tools/text-to-speech';

export const metadata: Metadata = {
  title: 'Text to Speech',
  description: 'Convert text to speech using the browser\'s built-in speech synthesis capabilities. Control voice, pitch, and rate for free.',
};

export default function TextToSpeechPage() {
  return <TextToSpeech />;
}
