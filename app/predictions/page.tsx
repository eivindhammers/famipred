'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { QUESTIONS } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function PredictionsPage() {
  const { isAuthenticated, userName, logout } = useAuth();
  const router = useRouter();
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(10).fill(null));
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    // Check if user already has predictions
    const checkExisting = async () => {
      if (!userName || !db) return;
      
      try {
        const q = query(
          collection(db, 'predictions'),
          where('userName', '==', userName)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setHasExisting(true);
          const existing = snapshot.docs[0].data();
          if (existing.answers) {
            setAnswers(existing.answers);
          }
        }
      } catch (error) {
        console.error('Error checking existing predictions:', error);
      }
    };

    checkExisting();
  }, [isAuthenticated, userName, router]);

  const handleAnswer = (index: number, value: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (answers.some(a => a === null)) {
      alert('Vennligst svar på alle spørsmålene');
      return;
    }

    if (!db) {
      alert('Database er ikke konfigurert. Vennligst konfigurer Firebase.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'predictions'), {
        userName,
        answers,
        timestamp: Timestamp.now()
      });
      setSaved(true);
      setTimeout(() => {
        router.push('/results');
      }, 1500);
    } catch (error) {
      console.error('Error saving predictions:', error);
      alert('Det oppstod en feil ved lagring. Prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Dine spådommer for 2026
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Innlogget som: <span className="font-semibold">{userName}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition"
          >
            Logg ut
          </button>
        </div>

        {hasExisting && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-400 px-4 py-3 rounded-lg mb-6">
            Du har allerede registrert spådommer. Du kan oppdatere dem nedenfor.
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {QUESTIONS.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                <p className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                  {question.id}. {question.text}
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleAnswer(index, true)}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                      answers[index] === true
                        ? 'bg-green-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    ✓ Ja
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAnswer(index, false)}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                      answers[index] === false
                        ? 'bg-red-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    ✗ Nei
                  </button>
                </div>
              </div>
            ))}

            {saved && (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 px-4 py-3 rounded-lg text-center">
                ✓ Spådommene dine er lagret! Sender deg videre...
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push('/results')}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-4 px-6 rounded-lg transition"
              >
                Se alle spådommer
              </button>
              <button
                type="submit"
                disabled={loading || saved}
                className={`flex-1 font-semibold py-4 px-6 rounded-lg transition ${
                  loading || saved
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105'
                }`}
              >
                {loading ? 'Lagrer...' : hasExisting ? 'Oppdater spådommer' : 'Lagre spådommer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
