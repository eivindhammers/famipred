'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { QUESTIONS, Prediction } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function ResultsPage() {
  const { isAuthenticated, userName, logout } = useAuth();
  const router = useRouter();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    const fetchPredictions = async () => {
      if (!db) {
        setLoading(false);
        return;
      }
      
      try {
        const q = query(collection(db, 'predictions'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          userName: doc.data().userName,
          answers: doc.data().answers,
          timestamp: doc.data().timestamp?.toMillis() || Date.now()
        })) as Prediction[];
        setPredictions(data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const exportToCSV = () => {
    const headers = ['Navn', ...QUESTIONS.map(q => `Spørsmål ${q.id}`)].join(',');
    const rows = predictions.map(p => {
      const answers = p.answers.map(a => a ? 'Ja' : 'Nei').join(',');
      return `${p.userName},${answers}`;
    });
    
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `familiespådommer_2026_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const calculateStats = (questionIndex: number) => {
    if (predictions.length === 0) return { yes: 0, no: 0, yesPercent: 0 };
    const yes = predictions.filter(p => p.answers[questionIndex] === true).length;
    const no = predictions.length - yes;
    const yesPercent = Math.round((yes / predictions.length) * 100);
    return { yes, no, yesPercent };
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Laster...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Alle spådommer
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Innlogget som: <span className="font-semibold">{userName}</span>
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => router.push('/predictions')}
              className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
            >
              Dine spådommer
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              disabled={predictions.length === 0}
            >
              Eksporter CSV
            </button>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
            >
              {showComparison ? 'Skjul sammenligning' : 'Vis sammenligning'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition"
            >
              Logg ut
            </button>
          </div>
        </div>

        {predictions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Ingen spådommer registrert ennå.
            </p>
            <button
              onClick={() => router.push('/predictions')}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Registrer dine spådommer
            </button>
          </div>
        ) : (
          <>
            {showComparison && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Sammenligning av svar
                </h2>
                <div className="space-y-6">
                  {QUESTIONS.map((question, index) => {
                    const stats = calculateStats(index);
                    return (
                      <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                        <p className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                          {question.id}. {question.text}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                            <div 
                              className="bg-green-500 h-full flex items-center justify-end px-3 text-white text-sm font-semibold transition-all"
                              style={{ width: `${stats.yesPercent}%` }}
                            >
                              {stats.yesPercent > 10 && `${stats.yesPercent}% Ja`}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 w-32">
                            {stats.yes} Ja / {stats.no} Nei
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-gray-50 dark:bg-gray-900">
                        Navn
                      </th>
                      {QUESTIONS.map((q) => (
                        <th key={q.id} className="px-4 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-[80px]">
                          {q.id}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {predictions.map((prediction) => (
                      <tr key={prediction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                          {prediction.userName}
                        </td>
                        {prediction.answers.map((answer, index) => (
                          <td key={index} className="px-4 py-4 text-center">
                            {answer ? (
                              <span className="inline-block w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-lg">
                                ✓
                              </span>
                            ) : (
                              <span className="inline-block w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-lg">
                                ✗
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Spørsmålene
              </h2>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                {QUESTIONS.map((q) => (
                  <li key={q.id}>
                    <span className="font-semibold">{q.id}.</span> {q.text}
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
