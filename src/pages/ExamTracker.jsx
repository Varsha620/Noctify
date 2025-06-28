import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { serverTimestamp } from 'firebase/firestore';

function ExamTracker() {
  const [exams, setExams] = useState([]);
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    examDate: '',
    portions: ''
  });

  useEffect(() => {
    const fetchExams = async () => {
      if (!currentUser) return;

      try {
        const examRef = collection(db, 'users', currentUser.uid, 'exams');
        const q = query(examRef, orderBy('examDate', 'asc'));
        const snapshot = await getDocs(q);
        const examList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setExams(examList);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, [currentUser]);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = date.seconds ? new Date(date.seconds * 1000) : new Date(date);
    return d.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getUpcomingExams = () => {
    const today = new Date();
    return exams
      .filter(exam => {
        const examDate = exam.examDate?.seconds ? new Date(exam.examDate.seconds * 1000) : new Date(exam.examDate);
        return examDate >= today;
      })
      .sort((a, b) => {
        const dateA = a.examDate?.seconds ? new Date(a.examDate.seconds * 1000) : new Date(a.examDate);
        const dateB = b.examDate?.seconds ? new Date(b.examDate.seconds * 1000) : new Date(b.examDate);
        return dateA - dateB;
      })
      .slice(0, 3);
  };

  const getDaysUntilExam = (examDate) => {
    const today = new Date();
    const exam = examDate?.seconds ? new Date(examDate.seconds * 1000) : new Date(examDate);
    const diffTime = exam - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPillColor = (daysUntil) => {
    if (daysUntil <= 3) return 'bg-[#C1000F]';
    if (daysUntil <= 7) return 'bg-[#F32D17]';
    return 'bg-[#FD8839]';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const examRef = collection(db, 'users', currentUser.uid, 'exams');
      
      if (editingExam) {
        await updateDoc(doc(db, 'users', currentUser.uid, 'exams', editingExam.id), {
          subject: formData.subject,
          examDate: new Date(formData.examDate),
          portions: formData.portions,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(examRef, {
          subject: formData.subject,
          examDate: new Date(formData.examDate),
          portions: formData.portions,
          createdAt: serverTimestamp()
        });
      }

      setShowModal(false);
      setEditingExam(null);
      setFormData({ subject: '', examDate: '', portions: '' });
      
      // Refresh the exams list
      const q = query(examRef, orderBy('examDate', 'asc'));
      const snapshot = await getDocs(q);
      const examList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExams(examList);
    } catch (error) {
      console.error('Error saving exam:', error);
    }
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    const examDate = exam.examDate?.seconds ? new Date(exam.examDate.seconds * 1000) : new Date(exam.examDate);
    setFormData({
      subject: exam.subject,
      examDate: examDate.toISOString().split('T')[0],
      portions: exam.portions || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (examId) => {
    if (!currentUser) return;
    
    try {
      await deleteDoc(doc(db, 'users', currentUser.uid, 'exams', examId));
      setExams(exams.filter(exam => exam.id !== examId));
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  const upcomingExams = getUpcomingExams();

  return (
    <div className="min-h-screen w-full bg-[#ffffff] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full p-4 pb-20 md:pb-4">
        <Navbar />
        
        <h1 className="text-2xl md:text-3xl font-light text-[#5E000C] mt-6 mb-4 ml-2 animate-fadeInUp">EXAM TRACKER</h1>

        <div className="flex flex-col justify-between mt-4 gap-7 lg:flex-row">
          {/* Exams Table */}
          <div className="flex-1 min-h-[500px] bg-gradient-to-br from-[#FD8839] to-[#F32D17] p-4 md:p-6 rounded-2xl shadow-lg w-full lg:w-2/3 h-full flex flex-col animate-fadeInUp"
            style={{ boxShadow: '-9px 10px 30px #C1000F' }}>
            <div className="flex items-center gap-3 mb-4">
              <svg width="60" height="60" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[80px] md:h-[80px]">
                <path d="M12.5 9.375H62.5C64.5833 9.375 66.25 11.0417 66.25 13.125V56.25C66.25 58.3333 64.5833 60 62.5 60H12.5C10.4167 60 8.75 58.3333 8.75 56.25V13.125C8.75 11.0417 10.4167 9.375 12.5 9.375ZM12.5 18.75V56.25H62.5V18.75H12.5ZM18.75 25H56.25V31.25H18.75V25ZM18.75 37.5H43.75V43.75H18.75V37.5ZM50 37.5H56.25V43.75H50V37.5Z" fill="white" />
              </svg>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Your Exams</h2>
            </div>
            
            {/* Mobile-friendly table */}
            <div className="overflow-x-auto bg-white/10 rounded-xl p-4">
              <table className="w-full text-center min-w-[600px]">
                <thead>
                  <tr className="text-white text-lg md:text-xl font-normal border-b border-white/30">
                    <th className="py-3">Subject</th>
                    <th className="py-3">Exam Date</th>
                    <th className="py-3">Portions</th>
                    <th className="py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {exams.map(exam => (
                    <tr key={exam.id} className="h-12 border-b border-white/20 hover:bg-white/10 transition-colors">
                      <td className="py-2">{exam.subject}</td>
                      <td className="py-2">{formatDate(exam.examDate)}</td>
                      <td className="py-2 max-w-[200px] truncate">{exam.portions || 'Not specified'}</td>
                      <td className="py-2">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(exam)}
                            className="px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(exam.id)}
                            className="px-3 py-1 bg-[#C1000F] text-white rounded-lg hover:bg-[#5E000C] transition-colors text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {exams.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-8 text-white/70">No exams scheduled</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setEditingExam(null);
                  setFormData({ subject: '', examDate: '', portions: '' });
                  setShowModal(true);
                }}
                className="w-12 h-12 rounded-full bg-white text-[#F32D17] shadow-md hover:bg-gray-100 text-2xl transform transition-all duration-200 hover:scale-110 active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col w-full gap-5 lg:w-1/3">
            {/* Upcoming Exams */}
            <div className="bg-gradient-to-br from-[#FD8839] to-[#F32D17] p-4 rounded-xl shadow-md flex-1 animate-fadeInUp"
              style={{ boxShadow: '-5px 10px 30px #C1000F', animationDelay: '0.3s' }}>
              <h3 className="text-xl text-white font-semibold mb-4">Upcoming Exams</h3>
              <div className="space-y-3">
                {upcomingExams.map((exam, index) => {
                  const daysUntil = getDaysUntilExam(exam.examDate);
                  return (
                    <div key={exam.id} className="bg-white/20 rounded-lg p-3 animate-slideInRight" style={{ animationDelay: `${0.1 * index}s` }}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-white font-medium">{exam.subject}</h4>
                          <p className="text-white/80 text-sm">{formatDate(exam.examDate)}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs text-white rounded-full ${getPillColor(daysUntil)} animate-pulse`}>
                          {daysUntil <= 0 ? 'Today' : `${daysUntil} days`}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {upcomingExams.length === 0 && (
                  <p className="text-white/70 text-center py-4">No upcoming exams</p>
                )}
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-gradient-to-br from-[#F32D17] to-[#C1000F] p-4 rounded-xl shadow-md flex-1 min-h-[250px] animate-fadeInUp"
              style={{ boxShadow: '-5px 10px 30px #5E000C', animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 mb-4">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[40px] md:h-[40px]">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="white" />
                </svg>
                <h3 className="text-white font-medium text-base md:text-lg">Study Tips</h3>
              </div>
              
              <div className="space-y-3 text-white/90 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-white">📚</span>
                  <p>Create a study schedule and stick to it</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white">⏰</span>
                  <p>Take regular breaks during study sessions</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white">📝</span>
                  <p>Practice with past papers and mock tests</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white">🎯</span>
                  <p>Focus on understanding concepts, not memorizing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Exam Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="p-6 bg-white shadow-lg rounded-xl w-80 md:w-96">
            <h2 className="text-lg font-semibold text-[#5E000C] mb-4">
              {editingExam ? 'Edit Exam' : 'Add New Exam'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Subject name"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full p-3 border border-[#FD8839] rounded-lg focus:ring-2 focus:ring-[#F32D17] focus:border-transparent"
                required
              />
              
              <input
                type="date"
                value={formData.examDate}
                onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                className="w-full p-3 border border-[#FD8839] rounded-lg focus:ring-2 focus:ring-[#F32D17] focus:border-transparent"
                required
              />
              
              <textarea
                placeholder="Portions/Topics (optional)"
                value={formData.portions}
                onChange={(e) => setFormData({...formData, portions: e.target.value})}
                className="w-full p-3 border border-[#FD8839] rounded-lg focus:ring-2 focus:ring-[#F32D17] focus:border-transparent h-20 resize-none"
              />

              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => {
                    setShowModal(false);
                    setEditingExam(null);
                    setFormData({ subject: '', examDate: '', portions: '' });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#FD8839] to-[#F32D17] text-white rounded-lg hover:from-[#F32D17] hover:to-[#C1000F] transition-all"
                >
                  {editingExam ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExamTracker